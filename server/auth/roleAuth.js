const express = require("express");
const isAuth = require("../middleware/checkAuth");
const User = require("../schema/userSchema");


const router = express.Router()


router.get('/',isAuth,async (req,res,next) =>{
    try{
        const {email} = req.session.user
        const user = await User.findOne({email})
        const {usertype} = user;
        if(usertype !== 'user' ){
            res.json({user:true,dashboard:true})
        }else{
            res.json({user:true,dashboard:false})
        }
    }catch(err){
        next(err)
    }
})


module.exports = router;