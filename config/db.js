const mongoose = require('mongoose');

//connecting to Database
function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{ //this will connect to the database using the URI provided in .env file
        console.log("Connected to Database")

    }) 
}

module.exports = connectToDB; //exporting the function so that we can use it in app.js
//we will be using this function in app.js to connect to the database