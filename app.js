const express = require("express"),
    session = require('express-session'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/users"),
    dotenv = require('dotenv'),
    userRoutes = require('./routes/userRoutes'),
    activitiesRoutes = require('./routes/activityRoutes'),
    itemsRoutes = require('./routes/itemRoutes'),
    authRoutes = require('./routes/authRoutes'),
    app = express();
    
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);    
module.exports = app;
    
    