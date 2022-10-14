# Northcoders News API

## Background

NC-NEWS is API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Link to hosted version:

https:/em-nc-news.herokuapp.com/api

#

## Intructions
#

### To clone this project

$ git clone https://github.com/EmmaMaddocks/NC-NEWS.git
#

### To run this project locally

To clone this project and run it locally, you will need to create two .env files: `.env.test` and `.env.development`. 

Into env.test, copy and paste `PGDATABASE=nc_news_test`.

Into env.delelopment, copy and past `PGDATABASE=nc_news`.

This will enable you to connect to the two databases locally.

#

### To Install Dependencies

    $ npm install

    
### To Seed Database

    $ npm run setup-dbs
    $ npm run seed
    
### To Run Entire Test Suite

    $ npm test
    
### To Run The App Test Suite

    $ npm test app.test.js

#

You will need to have the following versions as a minimum to run this project:

PostgreSQL v14.4    |   Node v16.16.0
