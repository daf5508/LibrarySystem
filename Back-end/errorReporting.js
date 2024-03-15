const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
let env;

const secureEnv = require('secure-env');

let transporter;

const timezone = { timeZone: 'America/New_York' };

try 
{
    env = dotenv.config();
}
catch (error)
{
    console.error("(" + getDate() + ", " + getTime() + "): " + "Error reading from env file: " , error);
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
    console.error("(" + dateAndTime + "): " + "Error reading from secure env file: " , error);
}

async function sendError(system, end, file, method, action, issue) {
    try 
    {
        const date = getDate();
        const time = getTime();
        const dateAndTime = date + ", " + time;

        const messageParams = 
        {
            to: global.env.NUMBER,
            text: `\n\nError In: ${system}\n\nDate: ${date}\nTime: ${time}\n\nEnd: ${end}\nFile: ${file}\n\nMethod: ${method}\n\nAction: ${action}\n\nError: ${issue}\n\n`,
        };

        const sentMessage = await transporter.sendMail(messageParams);

        if (sentMessage)
        {
            console.log("(" + dateAndTime + "): " + "Text Sent Successfully!");
        }
        else
        {
            console.log("(" + dateAndTime + "): " + "Error sending message: ", issue);
        }
    }
    catch (error)
    {
        console.log("(" + dateAndTime + "): " + "Error in sendError: ", error);
    }
}

function getDate() {
    //Retrieve the current date for EST
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', timezone);

    return date;
}

function getTime() {
    //Retrieve the current time for EST
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString('en-US', timezone);

    return time;
}

module.exports = {
    sendError: sendError,
};