const express = require('express');

const routes = require('./routes/userRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

module.exports = app;
