const mongoose = require('mongoose');
const app = require('./app');

const dotenv = require('dotenv'); 
dotenv.config(); 

const port = process.env.PORT || 3000;
const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/API';

mongoose.connect(mongodb, { useUnifiedTopology: true }, (err) => {
  if (err) console.log(`ERROR: connecting to Database. ${err}`);
  else {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  }
});

