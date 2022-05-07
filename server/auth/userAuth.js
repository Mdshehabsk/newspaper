const express = require("express");
const isAuth = require("../middleware/checkAuth");
const User = require("../schema/userSchema");


const router = express.Router()


router.get('/userAuth',isAuth,async (req,res,next) =>{
    try{
        const {_id , googleId} = req.session.user
    if(_id ){
        res.json({user:true})
    }if(googleId){
        res.json({user:true})
    }
    else{
        return
    }
    }catch(err){
        next(err)
    }
})


module.exports = router;