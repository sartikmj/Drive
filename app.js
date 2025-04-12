const express = require("express");


//importing routes
const userRouter = require("./routes/user.routes")

//importing .env file
const dotenv = require("dotenv")

dotenv.config() //this will import the variables from .env file and make them 
// available in process.env , and can be accessed using process.env.VARIABLE_NAME anywhere in the project

const connectToDB = require("./config/db") //importing the db connection file , u cal also use different name other than function name for varaible here and calling it will directly call the function 

connectToDB() //this will connect to the database using the function connectToDB we created in db.js file

const app = express();

app.set('view engine', 'ejs');

//imported routes will be used as Middleware , to get to the routes we have to use the same name as in the file
// app.use('/user',userRouter) //this will make the route /user/test   <<-----IMPORTANT
// app.use('/user', userRouter)

//we do not make any route in app.js we import them and cofig them , even the below route will not be made
// app.get('/',(req,res)=>{ 
//     res.render('index')
// })


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

//we are adding inside package.json in script section
// "start": "npx nodemon app.js"
//now instead of writing whole , we can only write npm start

//we are using JWT and B crypt for authentication and password hashing respectively

//we will be putting different roles routes in different files , inside routes folder