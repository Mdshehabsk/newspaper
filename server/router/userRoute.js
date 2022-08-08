// const passport = require("passport");
const imageUpload = require("../controller/imageUploader");
const router = require("express").Router();

const {
  registerController,
  loginController,
  logoutController,
  profileUpdateController,
  authGoogle,
  registerVerification,
  forgetPassword,
  resetPassword,
  userModifyController,
  userSearchController,
} = require("../controller/userController");
const isAdmin = require("../middleware/checkAdminAuth");
const isAuth = require("../middleware/checkAuth");
const User = require("../schema/userSchema");
const registerValidation = require("../validation/registerValidation");
const resetPasswordValidation = require("../validation/resetPasswordValidation");
router.get("/", isAuth, async (req, res,next) => {
  try{
    const {_id , googleId} = req.session.user
  if(_id){
    const user = await User.findById(_id)
    const {email,imageUrl,name} = user;
    const hostname = req.protocol + "://" + req.get("host");
    res.json({name,email,imageUrl:`${hostname}/${imageUrl}`,user:true})
  }
  if(googleId){
    const user = await User.findOne({googleId})
    const {email,imageUrl,name,updateCount} = user;
    const hostname = req.protocol + "://" + req.get("host");
    if(updateCount === 0){
      res.json({name,email,imageUrl,user:true})
    }else{
      res.json({name,email,imageUrl:`${hostname}/${imageUrl}`,user:true})
    }
  }
  }catch(err){
    next(err)
  }
});

//custom registraiton and login route
router.post("/register",registerValidation,  registerController);
router.post('/registerVerification',registerVerification)
router.post('/auth/google',authGoogle)
router.post("/login", loginController);
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword',resetPasswordValidation,resetPassword)
router.put('/profile/update',isAuth,imageUpload.single('avatar'),profileUpdateController)
router.get('/userSearch/',isAuth,isAdmin,userSearchController)
router.post('/usermodify/:id',isAuth,isAdmin,userModifyController)
router.get("/logout",isAuth, logoutController);
//google auth route
// require("../passport/passportAuth");
// router.get(
//   "/login/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/login/google/callback",
//   passport.authenticate("google", { failureRedirect: "/faile/google" }),

//   (req, res) => {
//     const { _id, name, email, usertype, modelName } = req.user;
//     req.session.user = {
//       _id,
//       name,
//       email,
//       usertype,
//       modelName,
//     };
//     req.session.Auth = true;
//     res.redirect("http://localhost:3000/");
//   }
// );
// router.get("/faile/google", (req, res) => {
//   res.send("faild");
// });
module.exports = router;
