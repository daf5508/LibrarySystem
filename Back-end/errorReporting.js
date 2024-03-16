const logger = require('./logger.js');

const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
let env;

const secureEnv = require('secure-env');

let transporter;

try 
{
    env = dotenv.config();
}
catch (error)
{
    logger.log(`Error reading from env file: ${error}`);
}

try 
{
    global.env = secureEnv({secret: env.parsed.ENV_PASS});

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: 
        {
            user: global.env.EMAIL, 
            pass: global.env.EMAIL_PASS,
        }
    });
}
catch (error)
{
    logger.log(`Error reading from secure-env file: ${error}`);
}

async function sendError(system, end, file, method, action, issue) {
    try 
    {
        const date = getDate();
        const time = getTime();

        const messageParams = 
        {
            to: global.env.NUMBER,
            text: `\n\nError In: ${system}\n\nDate: ${date}\nTime: ${time}\n\nEnd: ${end}\nFile: ${file}\n\nMethod: ${method}\n\nAction: ${action}\n\nError: ${issue}\n\n`,
        };

        const sentMessage = await transporter.sendMail(messageParams);

        if (sentMessage)
        {
            logger.log(`Text Sent Successfully!`);
        }
        else
        {
            logger.log(`Failed to send text`);
        }
    }
    catch (error)
    {
        logger.log(`Error in sendError: ${error}`);
    }
}

function getDate(){ 
    const currentDate = new Date();
    const timezone = { timeZone: 'America/New_York' };
    const date = currentDate.toLocaleDateString('en-US', timezone);

    return date;
}

function getTime() {
    const currentTime = new Date();
    const timezone = { timeZone: 'America/New_York' };
    const time = currentTime.toLocaleTimeString('en-US', timezone);

    return time;
}

module.exports = {
    sendError: sendError,
};