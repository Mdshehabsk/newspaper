const express = require("express");
const isAuth = require("../middleware/checkAuth");
const User = require("../schema/userSchema");


const router = express.Router()


router.get('/userAuth',isAuth,async (req,res) =>{
    const {_id , googleId} = req.session.user
    if(_id ){
        const user = await User.findById(_id)
        const {imageUrl} = user;
        res.json({imageUrl,user:true})
    }if(googleId){
        const user = await User.findOne({googleId})
        const {imageUrl} = user;
        res.json({imageUrl,user:true})
    }
    else{
        console.log('nothing here')
    }
})


module.exports = router;