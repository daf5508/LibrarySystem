const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, 'server.log');

const logQueue = [];
let activelyLogging = false;

let previousDate = null;

const deleteLogsDaysLater = 5;

//Run the deleteOldLogs function at 11:59 PM every night
cron.schedule('59 23 * * *', () => {
    deleteOldLogs();
}, {
    timezone: 'America/New_York'
});

function log(message){

    const dateTime = getDateAndTime();
    const logMessage = `(${dateTime}): ${message}\n`;
    const logFilePath = path.join(__dirname, 'server.log');

    const date = dateTime.split(', ')[0];
    
    if (previousDate !== null && date !== previousDate)
    {
        fs.appendFileSync(logFilePath, '\n');
        previousDate = date;
    }

    console.log(`(${dateTime}): ${message}`);

    logQueue.push({ dateTime, logMessage, logFilePath });

    if (!activelyLogging)
    {
        processLogQueue();
    }
}

async function processLogQueue() {

    activelyLogging = true;

    while (logQueue.length > 0)
    {
        const { dateTime, logMessage, logFilePath } = logQueue.shift();

        try 
        {
            await fs.promises.appendFile(logFilePath, logMessage); //Append message to log file
        }
        catch (error)
        {
            console.log(`(${getDateAndTime()}): Failed to write to log file: ${error}`);
        }
    }

    activelyLogging = false;
}

function deleteOldLogs() {

    try 
    {
        const currentDateParts = getDateAndTime().split(', ')[0].split('/'); //Extract the date and then the month, day and year
        const currentDate = new Date(`${currentDateParts[2]}-${currentDateParts[0]}-${currentDateParts[1]}`); //Rearrange date into yyyy/mm/dd format
        
        const logData = fs.readFileSync('server.log', 'utf8');
        const logs = logData.split('\n'); //Convert logData to array of lines

        const filteredLogs = logs.filter(log => {
            const extractLogDateTime = log.match(/\((.*?)\)/)[1]; //Extract (Date, Time)
            const extractLogDateParts = extractLogDateTime.split(', ')[0].split('/'); //Extract the date and then the month, day and year
            
            const logDate = new Date(`${extractLogDateParts[2]}-${extractLogDateParts[0]}-${extractLogDateParts[1]}`); //Rearrange date into yyyy/mm/dd format
            const dateDifference = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24));

            return dateDifference <= deleteLogsDaysLater;
        });

        const filteredLogData = filteredLogs.join('\n');

        fs.writeFile(logFilePath, filteredLogData, 'utf-8', error => {
            if (error)
            {
                log(`Error writing filtered log data: ${error}`);
                return;
            }
            
            log(`Log File updated successfully, old logs deleted`);
        });
    }
    catch (error)
    {
        logger.log(`Failed to read log file: ${error}`);
    }
}

function getDateAndTime() {
    //Retrieve the current date and time for EST
    const currentDateAndTime = new Date();
    const timezone = { timeZone: 'America/New_York' };
    const dateTime = currentDateAndTime.toLocaleString('en-US', timezone);

    return dateTime;
}

module.exports = {
    log: log,
};