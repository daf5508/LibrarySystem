const reportError = require('./errorReporting.js');
const logger = require('./logger.js');

const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dotenv = require('dotenv');
let env;

let initialStartup = true;
let pool;

const retryDelay = 1000; //Set delay to one second
const maxRetries = 5;

// CHANGES: Begin Commenting Out ---------------------------
/* try 
{
    env = dotenv.config();
}
catch (error)
{
    logger.log(`Error reading from env file: ${error}`);
    process.exit(1);
}

const secureEnv = require('secure-env');

try 
{
    global.env = secureEnv({secret: env.parsed.ENV_PASS});
}
catch (error)
{
    logger.log(`Error reading from secure-env file: ${error}`);
    process.exit(1);
} */
// --------------------------- End Commenting Out

async function connectToDatabase() {

    for (let attempt = 1; attempt <= maxRetries; attempt++)
    {
        logger.log(`Attempting to connect to database. Attempt #${attempt}`);

        try
        {
            //If we don't have an existing connection pool
            //Get a new one
            //Otherwise, return true since we do have one
            if (!pool)
            {
                // CHANGES: Begin Change ---------------------------
                pool = mysql.createPool({
                    host: '127.0.0.1',
                    port: '3306',
                    user: 'your username (Ex: root)',
                    password: 'your password',
                    database: 'librarydb',
                    connectionLimit: 20, //Max 20 connections in the pool
                    idleTimeout: 1800, //Max idle time 30 seconds
                });
                // --------------------------- End Change
            }
            
            //Rest of code
        }
        catch (error)
        {      
            //Rest of code
        }
    }
    //Rest of code
}

async function startServer() {
    // Code for startServer function
}

startServer();