//all the routes related to user will be in this file

const express = require("express");

const router = express.Router();

const { body, validationResult } = require("express-validator")

const userModel = require('../models/user.model')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const {upload} = require("../middleware/multer.js");
const cloudinaryUpload = require("../middleware/cloundinary.js");

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
    body('email').trim().isEmail().isLength({ min: 13 }), //checking if the given email is actually an email or not
    body('password').trim().isLength({ min: 5 }), //checking if the password is of minimum 5 characters or not
    body('username').trim().isLength({ min: 3 }),
    // upload.fields() Used to handle file uploads for multiple fields.
    upload.fields([
        {name: 'avatar', maxCount: 1},
        {name: 'coverImage', maxCount: 1}
    ]),
    async (req, res) => {
        //object destructuring
        const { email, username, password } = req.body; //taking out email,username,password from req.body
        const hashPassword = await bcrypt.hash(password, 10) //10 is the number of times it is hashed

        //getting avatra and cover image from req.files

        const avtarLocalPath = req.files.avatar ? req.files.avatar[0].path : res.status(400).json({ message: "Avtar is required" });
        const coverImageLocalPath = req.files.coverImage ? req.files.coverImage[0].path : res.status(400).json({ message: "Cover Image is required" });
        console.log(avtarLocalPath, coverImageLocalPath);
        //uploading the image to cloudinary
        const avtarPath = await cloudinaryUpload(avtarLocalPath);
        const coverImagePath = await cloudinaryUpload(coverImageLocalPath);

        let newUser ={
            email,
            username,
            password: hashPassword,
            avatar: avtarPath,
            coverImage: coverImagePath
        }
        res.json(newUser) //sending newUser to the client
        console.log(newUser);

        // const newUser = await userModel.create({ //create a new user with these 3 properties given
        //     email,
        //     username,
        //     password: hashPassword,
        //     avatar: avtarPath,
        //     coverImage: coverImagePath
        // })
        //
        // res.json(newUser) //sending newUser to the client

    })

//login route
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password'),
    async (req, res) => {

        //if the above pass and username are wrong , handling errors

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid Data'
            })
        }

        //if the username , password is correct

        const { username, password } = req.body;

        //checking in Database if the username and password are right
        const user = await userModel.findOne({
            username: username
        })

        //agar user nahi mila
        if (!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        //agar user mil jata hai to , now we will compare password

        const isMatch = await bcrypt.compare(password, user.password) //password that came in req.body , user.password password in stored in db for that particular username
        //it will compare and return boolean value

        //if password not matched
        if (!isMatch) {
            return status(400).json({
                message: 'username or password is incorrect'
            })
        }

        //if password is matched 
        //we will generate a token
        //JWT -> jsonwebtoken , used to check if user is loggedin or not 

        const token = jwt.sign({ //first parameter is an object
            userId: user.id,
            email: user.email,
            username: user.username
        }, //second parameter is a secret key , put inside .env file
            //to use secret key:
            process.env.JWT_SECRET,
        ) //now u will hahve a token , and token is to be send on frontend
        //JWT is used to keep the user authorised after login
        //token is saved in cookies, npm i cookie-parser , set it in app.js
        //setting the token in cookie
        res.cookie('token',token) //first parameter name of cookie,second parameter actual value of cookie

        res.send('Logged in')

    })


//we have to export the router so that we can use it in app.js
module.exports = router;
//now we will import this file in app.js and use it as middleware

//we will require this model inside user.routes file in routes folder