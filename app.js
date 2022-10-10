const express = require('express');
const app = express();
const { fetchAllTopics } = require('');

app.use(express.json());

app.get('api/topics', fetchAllTopics)