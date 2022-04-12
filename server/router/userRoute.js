const passport = require('passport');
const router = require('express').Router();

const {registerController, loginController, logoutController} = require('../controller/userController');
const isAuth = require('../middleware/checkAuth');
const registerValidation = require('../validation/registerValidation');
router.get('/',isAuth,async (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})


//custom registraiton and login route
router.post('/register',registerValidation, registerController);
router.post('/login',loginController);
router.get('/logout',logoutController);
//google auth route
require('../passport/passportAuth')
router.get(
    "/login/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/login/google/callback",
    passport.authenticate("google", { failureRedirect: "/faile/google" }),

    (req, res) => {
      const {_id, name, email, usertype,modelName} = req.user;
      req.session.user= {
        _id,
        name,
        email,
        usertype,
        modelName
    }
    req.session.Auth = true;
      res.redirect("/");
    }
  );
router.get('/faile/google',(req,res)=>{
  res.send('faild')
})
module.exports = router