# Northcoders News API


## Background
#

NC-NEWS is API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

#

## Links to hosted version:
#

Heroku currently hosts this project; the link below will take you to a list of all the available endpoints in JSON format.

https:/em-nc-news.herokuapp.com/api


## Prerequisites
#
Node.js v.16 and PostgreSQL v.14 or greater are needed as a minumum to ensure the project runs as intended.


<br><br>

## Set up and Installation
#

### To run this project on your local machine, please firstly clone the following repository:

https://github.com/EmmaMaddocks/NC-NEWS.git
<br>
<br>

### You will then need to complete the following steps:
<br>

### Install Dependencies

    $ npm install
    
<br>

### To run this project locally


You will then need to create two .env files: 
`.env.test`
`.env.development`

Into env.test, you will need to copy and paste `PGDATABASE=nc_news_test`.

Into env.delelopment, you will need to copy and paste `PGDATABASE=nc_news`.
<br>

This will enable you to connect to the two databases locally.

  <br>
  
### To Seed the Database

    $ npm run setup-dbs
    $ npm run seed

  <br>
  
### To Run the Entire Test Suite

    $ npm test
    

<br>

### To Run the App Test Suite

    $ npm test app.test.js

#
