<img src="./images/diego-pardo-logo-2.png" alt="Logo of the project" align="right" style="max-width: 100%;width: 200px;">

# Event QR ticket management system &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

## Description

This administration system allows you to manage the information about your events, salespersons and clients (CRUD). Also, you can create a unique link for each salesperson to sell tickets and generate a secure QR ticket for each client (npm <a href="https://www.npmjs.com/package/crypto-js">crypto</a> and <a href="https://www.npmjs.com/package/qrcode">qrcode</a>). I applied the <a href="https://www.geeksforgeeks.org/what-is-pern-stack/">PERN</a> stack to carry out this project, creating a rest API with Nodejs-Express and a client with Reactjs. I chose these technologies to meet the requirements and apply a relational database with PostgreSQL. Finally, I use <a href="https://cloudinary.com/">Cloudinary</a> to store payment receipts in the cloud.

## Project main process

<img src="./images/qr-ticket-management-system-customer-flow-3.png" alt="Logo of the project" style="max-width: 100%;width: 700px;">

> This image describes the process of a customer going to an event.


## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
commands here
```

Here you should say what actually happens when you execute the code above.

## Developing

### Built With
List main libraries, frameworks used including versions (React, Angular etc...)

### Prerequisites
What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
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

