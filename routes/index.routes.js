const express = require('express')

const router = express.Router()

//to acquire the /home route , you have to require this file in app.js
router.get('/home',(req,res)=>{
    res.render('home')
})



module.exports = router;