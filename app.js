const express = require("express"),
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
    
    