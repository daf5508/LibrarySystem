const reportError = require('./errorReporting.js');

const cors = require("cors");
const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dotenv = require('dotenv');
let env;

// CHANGES: Begin Commenting Out ---------------------------
/* try 
{
    env = dotenv.config();
}
catch (error)
{
    console.error("(" + getDateAndTime() + "): " + "Error reading from env file: " , error);
    process.exit(1);
}

const secureEnv = require('secure-env');

try 
{
    global.env = secureEnv({secret: env.parsed.ENV_PASS});
}
catch (error)
{
    console.error("(" + getDateAndTime() + "): " + "Error reading from secure env file: " , error);
    process.exit(1);
} */
// --------------------------- End Commenting Out

let pool;

const retryDelay = 1000; //Set delay to one second
const maxRetries = 5;

async function connectToDatabase() {

    for (let attempt = 1; attempt <= maxRetries; attempt++)
    {
        console.log("(" + getDateAndTime() + "): " + "Attempting to connect to database. Attempt #" + attempt);

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
                    user: 'root',
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

function getDateAndTime() {
    // Code for getDateAndTime function
}