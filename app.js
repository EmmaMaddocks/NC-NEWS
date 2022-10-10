// const { application } = require('express');
const express = require('express');
const app = express();
const { fetchAllTopics } = require('./controllers');


app.use(express.json());

app.get('/api/topics', fetchAllTopics)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ message: err.msg });
    } else {
        next(err);
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'server error' });
})

module.exports = app;