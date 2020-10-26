const mongoose = require('mongoose');
require('dotenv').config();
const DB_KEY = process.env.DB_KEY;


// --------------------- BDD -----------------------------------------------------
// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb+srv://' + DB_KEY + '.mongodb.net/mymovizapp?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database MyMovizApp connection : Success ***');
    }
   }
);