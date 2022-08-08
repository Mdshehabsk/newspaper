const User = require('../schema/userSchema')

const isAdmin =async (req,res,next) =>{
    const {usertype} = await User.findOne({email: req.email})
    if(usertype === 'admin'){
        next()
    }else{
        res.status(202).json({message:'you are not admin'})
    }
}


module.exports = isAdmin