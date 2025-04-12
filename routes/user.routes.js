//all the routes related to user will be in this file

const express = require("express");

const router = express.Router();

const { body, validationResult } = require("express-validator")

// router.get('/test',(req,res)=>{
//     res.send("User test route")
// })

//routes for registration

router.get('/register', (req, res) => {
    res.render("register")
})
//trim() will remove all the spaces in the string
router.post('/register',
    // body() Used to define validation rules on request body fields.
    body('email').trim().isEmail().isLength({ min:13 }), //checking if the given email is actually an email or not
    body('passworrd').trim().isLength({ min: 5 }), //checking if the password is of minimum 5 characters or not
    body('username').trim().isLength({ min: 3 }),
    (req, res) => {
        // validationResult(req) Used to check if the validations failed and extract error messages.

        const errors = validationResult(req) //this will give us an array of errors if any
        
        if(!errors.isEmpty()){
            //sending error to webpage
            return res.status(400).json({
                errors: errors.array(), //this will give us the array of errors in json format
                message: "Invalid Data"
            }) 
        }
        
    })

//we have to export the router so that we can use it in app.js
module.exports = router;
//now we will import this file in app.js and use it as middleware

//we will require this model inside user.routes file in routes folder