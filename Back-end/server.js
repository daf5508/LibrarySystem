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

try 
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
}

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
                pool = mysql.createPool({
                    host: global.env.DB_HOST,
                    port: global.env.DB_PORT,
                    user: global.env.DB_USER,
                    password: global.env.DB_PASSWORD,
                    database: global.env.DB_NAME,
                    connectionLimit: 20, //Max 20 connections in the pool
                    idleTimeout: 1800, //Max idle time 30 seconds
                });
            }
            
            const connection = await pool.getConnection();
            connection.release();

            console.log("(" + getDateAndTime() + "): " + "Reconnection to database successful");
            return true;
        }
        catch (error)
        {      
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    
    console.log("(" + getDateAndTime() + "): " + "Failed to connect to MySQL Database after maximum retries");
    return false;
}

async function startServer() {
    try 
    {   
        const poolCreation = await connectToDatabase();

        if (poolCreation)
        {
            console.log("(" + getDateAndTime() + "): " + "Success: MySQL Database Connection Successful");

            app.listen(3000, ()=> {
                console.log("(" + getDateAndTime() + "): " + "Express.js server listening on port 3000");
            });

            app.use(express.static(path.join(__dirname, '..', 'librarysystem-ui', 'dist', 'library-system')));

            app.get("/getAllBooks", async (req, res) => {
                console.log("(" + getDateAndTime() + "): " + "Received GET request for /getAllBooks");
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getAllBooks");
                    connection.release(); //Release the connection back to the pool
                    res.status(200).json(rows[0]);

                    console.log("(" + getDateAndTime() + "): " + "Success sending book list");
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        console.log("(" + getDateAndTime() + "): " + "Error sending book list");

                        res.status(500).send("Internal Server Error: Issue getting book list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getAllBooks)", "Getting book list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        console.log("(" + getDateAndTime() + "): " + "Attempting to send book list again");
                        app.handle(req, res);
                    }
                }
            });

            app.get("/getAllGenres", async (req, res) => {
                console.log("(" + getDateAndTime() + "): " + "Received GET request for /getAllGenres");
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getAllGenres");
                    connection.release(); //Release the connection back to the pool
                    res.status(200).json(rows[0]);

                    console.log("(" + getDateAndTime() + "): " + "Success sending genre list");
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        console.log("(" + getDateAndTime() + "): " + "Error sending genre list");

                        res.status(500).send("Internal Server Error: Issue getting genre list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getAllGenres)", "Getting genre list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        console.log("(" + getDateAndTime() + "): " + "Attempting to send genre list again");
                        app.handle(req, res);
                    }
                }
            });

            app.get("/getMaxPages", async (req, res) => {
                console.log("(" + getDateAndTime() + "): " + "Received GET request for /getMaxPages");
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getMaxPages");
                    connection.release(); //Release the connection back to the pool

                    const maxPages = rows[0][0].maxPages;
                    res.status(200).json(maxPages);

                    console.log("(" + getDateAndTime() + "): " + "Success sending max page count");
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        console.log("(" + getDateAndTime() + "): " + "Error sending max page count");

                        res.status(500).send("Internal Server Error: Issue getting max page count");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getMaxPages)", "Getting max pages from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        console.log("(" + getDateAndTime() + "): " + "Attempting to send max page count again");
                        app.handle(req, res);
                    }
                }
            });
        
            app.get("/getBooks_ByFilterRequirements", async (req, res) => {
                console.log("(" + getDateAndTime() + "): " + "Received GET request for /getBooks_ByFilterRequirements");
                try 
                {
                    const authors = req.query.authors === 'null' ? null : req.query.authors;
                    const genres = req.query.genres  === 'null' ? null : req.query.genres;
                    const pages = req.query.pages === 'null' ? null : req.query.pages;
                    const published = req.query.published === 'null' ? null : req.query.published;
                    const availability = req.query.availability === 'null' ? null : req.query.availability;

                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL stepOne_filterAuthors(?, ?, ?, ?, ?)", [authors, genres, pages, published, availability]);
                    connection.release(); //Release the connection back to the pool

                    res.status(200).json(rows[0]);

                    console.log("(" + getDateAndTime() + "): " + "Success sending filtered book list");
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        console.log("(" + getDateAndTime() + "): " + "Error sending filtered book list");

                        res.status(500).send("Internal Server Error: Issue getting filtered book list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getBooks_ByFilterRequirements)", "Getting filtered book list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        console.log("(" + getDateAndTime() + "): " + "Attempting to send filtered book list again");
                        app.handle(req, res);
                    }
                }
            });

            app.post("/sendError", (req, res) => {

                const system = req.body.system;
                const end = req.body.end;
                const file = req.body.file;
                const method = req.body.method;
                const action = req.body.action;
                const error = req.body.error;

                console.log("(" + getDateAndTime() + "): " + "Received ERROR report");
                reportError.sendError(system, end, file, method, action, error);
            });
            
            app.get('/*', (req, res) => {
                console.log("(" + getDateAndTime() + "): " + "Redirecting to index.html");

                //Set the path of the index.html file
                const indexPath = path.join(__dirname, '..', 'librarysystem-ui', 'dist', 'library-system', 'index.html');

                //Check if Index.html exists
                fs.access(indexPath, fs.constants.F_OK, (error) => {
                    if (error) 
                    {
                        res.status(500).send("Internal Server Error: Index.html file not found.");
                        reportError.sendError("Library System", "Back-end", "server.js", "startServer", "Checking if Index.html exists", error);
                    }
                    else 
                    {
                        //Send the Index.html
                        res.sendFile(indexPath, (error) => {
                            if (error)
                            {
                                res.status(500).send("Internal Server Error: Failed to send Index.html.");
                                reportError.sendError("Library System", "Back-end", "server.js", "app.get(/*)", "Redirecting to Index.html", error);
                            }
                            else 
                            {
                                console.log("(" + getDateAndTime() + "): " + "Redirected successfully");
                            }
                        });
                    }
                });
            });
        }
        else 
        {
            console.log("(" + getDateAndTime() + "): " + "Failed to connect to MySQL Database after maximum retries");
            reportError.sendError("Library System", "Back-end", "server.js", "startServer", "Connecting to MySQL database", "Failure to connect to MySQL Database");
            process.exit(1);
        }
    }
    catch (error)
    {
        console.log("(" + getDateAndTime() + "): " + "Error setting variables and/or reading from env files");
        reportError.sendError("Library System", "Back-end", "server.js", "startServer", "Setting variables and reading from env files", error);
    }
}

startServer();

function getDateAndTime() {
    //Retrieve the current date and time for EST
    const currentDateAndTime = new Date();
    const timezone = { timeZone: 'America/New_York' };
    const dateTime = currentDateAndTime.toLocaleString('en-US', timezone);

    return dateTime;
}