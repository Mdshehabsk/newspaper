
const isAuth = (req, res, next) => {
    if (req.session.Auth) {
        req.email = req.session.user.email;
        req._id = req.session.user._id;
        next();
    } else {
       return res.status(202).json({
            message: "please login first"
        })
    }
}


module.exports =isAuth;