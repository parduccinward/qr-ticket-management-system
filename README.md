<img src="./images/diego-pardo-logo-2.png" alt="Logo of the project" align="right" style="max-width: 100%;width: 200px;">

# Event QR ticket management system &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

## Description

This administration system allows you to manage the information about your events, salespersons and clients (CRUD). Also, you can create a unique link for each salesperson to sell tickets and generate a secure QR ticket for each client (npm <a href="https://www.npmjs.com/package/crypto-js">crypto</a> and <a href="https://www.npmjs.com/package/qrcode">qrcode</a>). I applied the <a href="https://www.geeksforgeeks.org/what-is-pern-stack/">PERN</a> stack to carry out this project, creating a rest API with Nodejs-Express and a client with Reactjs. I chose these technologies to meet the requirements and apply a relational database with PostgreSQL. Finally, I use <a href="https://cloudinary.com/">Cloudinary</a> to store payment receipts in the cloud.

## Project main process

<img src="./images/qr-ticket-management-system-customer-flow-3.png" alt="Logo of the project" style="max-width: 100%;width: 700px;">

> This image describes the process of a customer going to an event.

## Getting Started


### Built With

- node: 16.15.0
- npm: 8.5.5
- express: 4.18.1
- react: 18.2.0
- pg: 8.7.3

### Prerequisites

1. Download and install <a href="https://nodejs.org/en/download/">Node.js</a>
2. Download and install <a href="https://www.postgresql.org/download/">PostgreSQL</a> 
3. Download and install <a href="https://www.postman.com/downloads//">Postman</a>


### Installation

First clone the repository with the following commands:

```shell
git clone https://github.com/parduccinward/qr-ticket-management-system.git
cd qr-ticket-management-system/
code .
```

Then start the application by installing npm on both the project root folder and the frontend folder, using the following commands:

#### Backend Start

```shell
npm i
npm run dev
```
The node server.js should start listening on port 4000.
#### Frontend Start

```shell
npm i
npm start
```
The client should start in the browser at port 3000.

#### Database Creation

Depending on the operating system you are using, follow the following guidelines to enter PostgreSQL:

- <a href="https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm">Windows Guide</a>
- <a href="https://www.w3resource.com/PostgreSQL/connect-to-postgresql-database.php">Linux Guide</a>

Once inside the psql command line, we create the database by executing the **create-database.sql** file contained in the models folder. Again, this is done depending on the operating system as follows:

Linux
```console

postgres=# \i /yourpath/qr-ticket-management-system/models/create-database.sql

```

Windows
```console

postgres=# \i 'C:/yourpath/qr-ticket-management-system/models/create-database.sql'

```

After running this command, you should get this response:

```console

CREATE DATABASE
You are now connected to database "ticketmanagement" as user "youruser"
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE

```

To check that all the tables were created correctly we can use the command \dt

#### User Creation

#### Create Cloudinary account and get keys

#### Create environment variables

### Deploying
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Configuration

Here you should write what are all of the configurations a user can enter when using the project.

## Database

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc... 

## Licensing

State what the license is and how to find the text version of the license.

## Acknowledgements

