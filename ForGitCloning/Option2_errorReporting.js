const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
let env;

const secureEnv = require('secure-env');

let transporter;

const timezone = { timeZone: 'America/New_York' };

// CHANGES: Begin Commenting Out ---------------------------
/* try 
{
    env = dotenv.config();
}
catch (error)
{
    console.error("(" + getDate() + ", " + getTime() + "): " + "Error reading from env file: " , error);
} */
// --------------------------- End Commenting Out

try 
{
    // CHANGES: COMMENT THIS OUT
    //global.env = secureEnv({secret: env.parsed.ENV_PASS});

    transporter = nodemailer.createTransport({
        service: 'gmail',
        // CHANGES: Begin Change ---------------------------
        auth: 
        {
            user: 'user@gmail.com', 
            pass: 'abcd efgh ijkl mnop',
        }
        // --------------------------- End Change
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
            // CHANGES: ADD YOUR NUMBER HERE
            to: '1234567890@txt.att.net',
            text: `\n\nError In: ${system}\n\nDate: ${date}\nTime: ${time}\n\nEnd: ${end}\nFile: ${file}\n\nMethod: ${method}\n\nAction: ${action}\n\nError: ${issue}\n\n`,
        };

        // Rest of code
    }
    catch (error)
    {
        // Rest of code
    }
}

function getDate() {
    // Code for getDate function
}

function getTime() {
    // Code for getTime function
}

module.exports = {
    sendError: sendError,
};