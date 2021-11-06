const express = require('express');

const userRoutes = require('./routes/userRoutes');
const activitiesRoutes = require('./routes/activityRoutes');
const itemsRoutes = require('./routes/itemRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/items', itemsRoutes);

module.exports = app;
