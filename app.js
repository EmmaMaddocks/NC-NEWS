// const { application } = require('express');
const { application } = require('express');
const express = require('express');
const app = express();
const { fetchAllTopics, fetchArticleById, fetchAllUsers } = require('./controllers');


app.use(express.json());

app.get('/api/topics', fetchAllTopics)

app.get('/api/articles/:article_id', fetchArticleById)

app.get('/api/users', fetchAllUsers)



app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ message: err.msg });
    } else {
        next(err);
    }
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad Request' });
    } else {
        next (err);
    }
  });



app.use((err, req, res, next) => {
    res.status(500).send({ message: 'server error' });
})


module.exports = app;