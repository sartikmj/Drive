const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

//we are adding inside package.json in script section
// "start": "npx nodemon app.js"
//now instead of writing whole , we can only write npm start