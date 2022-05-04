const passport = require("passport");
const router = require("express").Router();

const {
  registerController,
  loginController,
  logoutController,
  authGoogle,
} = require("../controller/userController");
const isAuth = require("../middleware/checkAuth");
const User = require("../schema/userSchema");
const registerValidation = require("../validation/registerValidation");
router.get("/", isAuth, async (req, res) => {
  const {_id , googleId} = req.session.user
  if(_id){
    const user = await User.findById(_id)
    const {email,imageUrl} = user;
    res.json({email,imageUrl})
  }
  if(googleId){
    const user = await User.findOne({googleId})
    const {email,imageUrl} = user;
    res.json({email,imageUrl})
  }
});

//custom registraiton and login route
router.post("/register", registerValidation, registerController);
router.post('/auth/google',authGoogle)
router.post("/login", loginController);
router.get("/logout", logoutController);
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
