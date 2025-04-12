const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //properties of the user model
    username: {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"Username must be atleast 3 characters long"] //in case of error(username length less than 3) we will get this message
    },

    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"Email must be atleast 13 characters long"] 
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"Password must be atleast 5 characters long"] 
    }
})

const user = mongoose.model('user',userSchema) //creating a model using the schema we created above
//user is the name of the model and userSchema is the schema we created above

module.exports = user