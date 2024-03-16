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

try 
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
}

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

            if (!initialStartup)
            {
                logger.log(`Reconnection to database successful`);
            }

            return true;
        }
        catch (error)
        {      
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    
    logger.log(`Failed to connect to MySQL Database after maximum retries`);
    return false;
}

async function startServer() {
    try 
    {   
        const poolCreation = await connectToDatabase();

        if (poolCreation)
        {
            initialStartup = false;
            logger.log(`Success: MySQL Database Connection Successful`);

            app.listen(3000, ()=> {
                logger.log(`Express.js server listening on port 3000`);
            });

            app.use(express.static(path.join(__dirname, '..', 'librarysystem-ui', 'dist', 'library-system')));

            app.get("/getAllBooks", async (req, res) => {
                logger.log(`Received GET request for /getAllBooks`);
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getAllBooks");
                    connection.release(); //Release the connection back to the pool
                    res.status(200).json(rows[0]);

                    logger.log(`Success sending book list`);
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        logger.log(`Error sending book list`);

                        res.status(500).send("Internal Server Error: Issue getting book list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getAllBooks)", "Getting book list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        logger.log(`Attempting to /getAllBooks again`);
                        app.handle(req, res); //Attempt to run app.get(/getAllBooks) again
                    }
                }
            });

            app.get("/getAllGenres", async (req, res) => {
                logger.log(`Received GET request for /getAllGenres`);
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getAllGenres");
                    connection.release(); //Release the connection back to the pool
                    res.status(200).json(rows[0]);

                    logger.log(`Success sending genre list`);
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        logger.log(`Error sending genre list`);

                        res.status(500).send("Internal Server Error: Issue getting genre list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getAllGenres)", "Getting genre list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        logger.log(`Attempting to /getAllGenres again`);
                        app.handle(req, res); //Attempt to run app.get(/getAllGenres) again
                    }
                }
            });

            app.get("/getMaxPages", async (req, res) => {
                logger.log(`Received GET request for /getMaxPages`);
                try 
                {
                    const connection = await pool.getConnection(); //Retrieve connection from connection pool
                    const [rows, fields] = await connection.query("CALL getMaxPages");
                    connection.release(); //Release the connection back to the pool

                    const maxPages = rows[0][0].maxPages;
                    res.status(200).json(maxPages);

                    logger.log(`Success sending max page count`);
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        logger.log(`Error sending max page count`);

                        res.status(500).send("Internal Server Error: Issue getting max page count");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getMaxPages)", "Getting max pages from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        logger.log(`Attempting to /getMaxPages again`);
                        app.handle(req, res); //Attempt to run app.get(/getMaxPages) again
                    }
                }
            });
        
            app.get("/getBooks_ByFilterRequirements", async (req, res) => {
                logger.log(`Received GET request for /getBooks_ByFilterRequirements`);
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

                    logger.log(`Success sending filtered book list`);
                }
                catch (error)
                {
                    const retryPoolCreation = await connectToDatabase();

                    if (!retryPoolCreation)
                    {
                        logger.log(`Error sending filtered book list`);

                        res.status(500).send("Internal Server Error: Issue getting filtered book list");
                        reportError.sendError("Library System", "Back-end", "server.js", "app.get(/getBooks_ByFilterRequirements)", "Getting filtered book list from MySQL Database", error);
                        process.exit(1);
                    }
                    else 
                    {
                        logger.log(`Attempting to /getBooks_ByFilterRequirements again`);
                        app.handle(req, res); //Attempt to run app.get(/getBooks_ByFilterRequirements) again
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

                logger.log(`Received ERROR report`);
                reportError.sendError(system, end, file, method, action, error);
            });
            
            app.get('/*', (req, res) => {
                logger.log(`Redirecting to index.html`);

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
                                logger.log(`Redirected successfully`);
                            }
                        });
                    }
                });
            });
        }
        else 
        {
            logger.log(`Failed to connect to MySQL Database after maximum retries`);
            reportError.sendError("Library System", "Back-end", "server.js", "startServer", "Connecting to MySQL database", "Failure to connect to MySQL Database");
            process.exit(1);
        }
    }
    catch (error)
    {
        logger.log(`Error setting variables and/or reading from env files`);
        reportError.sendError("Library System", "Back-end", "server.js", "startServer", "Setting variables and reading from env files", error);
    }
}

startServer();