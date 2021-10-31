const express = require('express');

const userRoutes = require('./routes/userRoutes');
const activitiesRoutes = require('./routes/activityRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/activities', activitiesRoutes);

module.exports = app;
