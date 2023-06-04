const mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/codeial_dev');

//acquire the connection to check if it is successful
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting to database'));

//up and running then print message
db.once('open',function(){
    console.log('Successfully connected to database');
});

module.exports = db;