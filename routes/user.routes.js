//all the routes related to user will be in this file

const express = require("express");

const router = express.Router();

// router.get('/test',(req,res)=>{
//     res.send("User test route")
// })

//routes for registration

router.get('/register',(req,res)=>{
    res.render("register")
})

//we have to export the router so that we can use it in app.js
module.exports = router;
//now we will import this file in app.js and use it as middleware