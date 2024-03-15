# LibrarySystem

[Dominic's Library](https://www.dominicslibrary.com/)

A personal project to explore full-stack development. This Library System allows users to browse, filter, and search books. Built with Angular 2, Node.js, MySQL and hosted on AWS (EC2, RDS) Instances. 

---

## Table of Contents
1. [Features](#features)
2. [Future Plans](#future-plans)
3. [Installation Instructions](#full-installation-instructions)
    - [For MySQL](#for-mysql)
        - [Help Section](#help-section)
            - [Help Establishing A Local Connection](#help-establishing-a-local-connection)
            - [Test Connection Failed](#test-connection-failed)
    - [For UI and API](#for-ui-and-api)
        - [Gmail App Password](#gmail-app-password)
        - [Phone Number Format](#phone-number-format)

---

## Features

### Home Page
* Browse books by genre
* Easily discover new titles within your favorite genres

### Browse Inventory
* Access the complete inventory of books "available" at the Library
* Select any book you wish to get all the details about it
* Filtering option available, filter books based on author, genre, page count, publish date, and availability
* Utilize these filtering options to refine your search and discover books tailored to your preferences

### Search Functionality
* Search for any specific title, author, or genre of your choosing
* Simplify your book search and locate desired books efficiently

---

## Future Plans

### To Do:
* Load the database up with many more books
    - Possibly learn to create a web scraper to add them
* Allow for better "similar results" in "Search" Page
    - Find a better string similarity algorithm, one that also ignores the length of the string
* Update "Author" in "Filter Results" to use similar process
    - Add suggestions as well, like "Search" Page suggestions
* Figure out better colors for Filter component
* Truncate description based on number of lines rather than words in "Search" Page
    - This will allow for better height control

### Debating Features:
* Add a "Back to Top" option in "Browse Inventory" Page
* Add an "Organize by" (Author, Title, Page Count, Publish Date) in "Browse Inventory" Page
* Have something similar for "Home" Page
* When there are enough books in the database, should I prevent duplicates in "Home" Page?

---

## Full Installation Instructions: 

### <ins>For MySQL:</ins>

**Step 1:** Install MySQL Server and MySQL Workbench: https://www.youtube.com/watch?v=u96rVINbAUI&ab_channel=WebDevSimplified <br />
    I selected the most recent MySQL Server and MySQL Workbench versions (just make sure they're the same)

**Step 2:** Make sure you have a local connection established in **MySQL Connections** <br />
    If you don't have one already, create it. If you're unsure how to, go to [Help Establishing A Local Connection](#help-establishing-a-local-connection) <br />
    Once you have a local connection, open it

**Step 3:** Import the "librarydb" database from the [librarydbDumpfile](/MySQL/librarydbDumpfile.sql) file located in [/LibrarySystem/MySQL/](/LibrarySystem/MySQL/) <br />
    Follow this video if you're unsure how to import the dumpfile: https://www.youtube.com/watch?v=3LZXrJUWCJM&ab_channel=codePython <br />
    The dumpfile contains all the tables and all the stored procedures

**Step 4:** You should be good to go with MySQL
<br />
<br />

**Help Section:** <a name="help-section"></a>

<ins>Help Establishing a Local Connection:</ins> <a name="help-establishing-a-local-connection"></a>
* Open MySQL Workbench
* Navigate to the `MySQL Connections` tab
* To the right of `MySQL Connections`, click on the `+` icon
* Enter the following in the appropriate fields: 
    - Connection Name: `local host`
    - Connection Method: `Standard (TCP/IP)`
    - Hostname: `127.0.0.1` 
    - Port: `3306`
    - Username: **(Your choice, I do `root` for local connections)**
    - Password: **(Your choice)**
    - Default Schema: **Can be left blank**
* Click `Test Connection`. (Enter your password if prompted)
    - If it's unsuccessful, go to [Test Connection Failed](#test-connection-failed)
    - If it's successful, click "Ok"
* You have now established a local connection

<ins>Test Connection Failed:</ins> <a name="test-connection-failed"></a>
* Locate the "Search" bar in your taskbar
* Type in "Services" and select it
* Scroll down to "MySQL80" and select it
* Click "Start the service" 
* Retry establishing a local connection following the steps in [Help Establishing A Local Connection](#help-establishing-a-local-connection)

##

### <ins>For UI and API:</ins>

**Step 1:** Install Node.js LTS if you don't have it already: https://nodejs.org/en <br />
    Verify successful installation by running `npm --version` in your CMD or VS Code terminal

**Step 2:** Clone Github Repository into your desired folder: https://github.com/daf5508/LibrarySystem.git

**Step 3:** Change directories into `.../LibrarySystem/Front-end/` and run `npm install -g @angular/cli` to install Angular 2 <br />
    Verify successful installation by running `ng version` in your CMD or VS Code terminal

**Step 4:** In the same directory, `.../LibrarySystem/Front-end/`, run `npm install` to install all necessary packages

**Step 5:** Change directories into `.../LibrarySystem/Back-end/`, run `npm install` to install all necessary packages

**Step 6:** You won't have the env and secure-env files. You can do one of two things to get around this (Option 1 is quicker): <br />
<br />
<ins>Option 1:</ins> 
* Comment out both env and secure-env try-catch blocks in server.js
* In `server.js`, replace:
    - `global.env.DB_HOST` with your Database Hostname
    - `global.env.DB_PORT` with your Database Port 
    - `global.env.DB_USER` with your Database Username
    - `global.env.DB_PASSWORD` with your Database Password
    - `global.env.DB_NAME` with your Database Name
* Your `server.js` should look like: [server.js](/ForGitCloning/Option1And2_server.js)
    - The code to change is marked `// CHANGES:`
    - Where you see `// Rest of code` or `// Code for ... fucntion`, that all stays the same
* Comment out or delete most of `errorReporting.js` like so: [errorReporting.js](/ForGitCloning/Option1_errorReporting.js)

<ins>Option 2:</ins>
* Comment out both env and secure-env try-catch blocks in both server.js and errorReporting.js
* Repeat second and third bullet points in Option 1
* In `errorReporting.js`, replace:
    - `global.env.EMAIL` with your Gmail Email 
    - `global.env.EMAIL_PASS` with your Gmail App Password (Check [Gmail App Password](#gmail-app-password))
    - `global.env.NUMBER` with your Phone Number (Check [Phone Number Format](#phone-number-format))
* Your `errorReporting.js` should look like: [errorReporting.js](/ForGitCloning/Option2_errorReporting.js)
    - The code to change is marked `// CHANGES:`
    - Where you see `// Rest of code` or `// Code for ... function`, that all stays the same
<br />

**Step 7:** You should now be good to run the application
* Make sure your MySQL Service is running
    - Check [Test Connection Failed](#test-connection-failed) under [For MySQL](#for-mysql) to start the service if it's not running
* In your CMD prompt, change directories into your `.../LibrarySystem/Front-end`
    - Run the command `ng serve`
* In your VS Code terminal or another CMD prompt, change directories into your `.../LibrarySystem/Back-end`
    - Run the command `node server.js`
* Now in your browser, search `http://localhost:4200/` to open the application
* Enjoy, test it out
<br />

<ins>Gmail App Password:</ins> <a name="gmail-app-password"></a>
* Follow this video to generate a Gmail App Password: https://www.youtube.com/watch?v=hXiPshHn9Pw&ab_channel=TweakLibrary
* Once you've generated it, replace `global.env.EMAIL_PASS` with it (Ex: 'abcd efgh ijkl mnop')

<ins>Phone Number Format</ins> <a name="phone-number-format"></a>
* For Email to SMS, you need special formatting with your phone number
* Replace `global.env.NUMBER` with your **(phone number)@(provider SMS format)**
    - Example for AT&T: **'1234567890@txt.att.net'**
* Here are formats for Verizon, AT&T, T-Mobile, and Sprint: 
    - Verizon:     123567890**@vtext.com**
    - AT&T:        1234567890**@txt.att.net**
    - T-Mobile:    1234567890**@tmomail.net**
    - Sprint:      1234567890**@messaging.sprintpcs.com**
    - Formats for other companies can be found online
* Notes: 
    - I found that Verizon and AT&T are pretty reliable
    - T-Mobile, Sprint and others were finicky. Some it might depend if you have a subject line for it to work

---