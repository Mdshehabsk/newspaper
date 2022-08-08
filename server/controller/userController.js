const bcrypt = require("bcrypt");
const fs = require("fs");
const ejs = require("ejs");
const createError = require("http-errors");
const User = require("../schema/userSchema");
const emailSent = require("./emailSent");
const registerController = async (req, res, next) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      return res.status(200).json({
        message: "please fill all the fields",
      });
    }
    if (password !== cpassword) {
      return res.status(200).json({
        message: "password does not match",
      });
    } else {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(200).json({
          message: "user already exist",
        });
      } else {
        const hastPassword = await bcrypt.hash(password, 10);
        const hastCpassword = await bcrypt.hash(cpassword, 10);
        const randomNumber = Math.floor(Math.random() * 1000000);
        const data = await ejs.renderFile('./views/index.ejs',{code:randomNumber})
        emailSent(email,data)
        req.session.user = {
          name,
          email,
          password: hastPassword,
          cpassword: hastCpassword,
          randomNumber,
        };
        return res
          .status(201)
          .json({ message: "verification code sent on your email " });
      }
    }
  } catch (err) {
    next(createError(500, err));
  }
};
const registerVerification = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { name, email, password, cpassword, randomNumber } = req.session.user;
    if (code == randomNumber) {
      const user = new User({
        name,
        email,
        password,
        cpassword,
      });
      await user.save();
      return res.status(201).json({
        message: "user created successfully",
      });
    } else {
      return res.status(200).json({
        message: "verification number does not match",
      });
    }
  } catch (err) {
    next(createError(500, err));
  }
};

const authGoogle = async (req, res, next) => {
  const { name, email, googleId, imageUrl } = req.body;
  const userExist = await User.findOne({ email });
  const googleIdExist = await User.findOne({ googleId });
  if (googleIdExist) {
    const { usertype } = googleIdExist;
    req.session.user = {
      name,
      email,
      googleId,
      usertype,
    };
    req.session.Auth = true;
    return res.status(200).json({ message: "login successfull" });
  } else {
    if (userExist) {
      return res.status(202).json({ message: "user already exist" });
    } else {
      const user = new User({
        name,
        email,
        googleId,
        imageUrl,
      });
      await user.save();
      req.session.user = {
        name,
        email,
        googleId,
        usertype: "user",
      };
      req.session.Auth = true;
      return res.status(200).json({ message: "login successfully" });
    }
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(202).json({
        message: "please fill all the fields",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(202).json({
          message: "user does not exist",
        });
      } else {
        if (user.googleId) {
          res.status(200).json({
            message: "please login with google",
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.status(200).json({
              message: "password does not match",
            });
          } else {
            const { _id, name, email, usertype, modelName } = user;
            req.session.user = {
              _id,
              name,
              email,
              usertype,
              modelName,
            };
            req.session.Auth = true;
            res.status(201).json({
              message: "login successfully",
            });
          }
        }
      }
    }
  } catch (err) {
    next(createError(500, err));
  }
};
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(200).json({
        message: "please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "user does not exist",
      });
    } else {
      const { googleId } = user;
      if (googleId) {
        return res.status(200).json({
          message: "please login with google",
        });
      } else {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const data = await ejs.renderFile('./views/index.ejs',{code:randomNumber})
        emailSent(email,data)
        req.session.user = {
          email,
          randomNumber,
        };
        return res.status(201).json({
          message: "verification code sent on your email",
        });
      }
    }
  } catch (err) {
    next(createError(500, err));
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { code, password, cpassword } = req.body;
    const { email, randomNumber } = req.session.user;
    if (code == randomNumber) {
      if (!password || !cpassword) {
        return res.status(200).json({
          message: "please fill all the fields",
        });
      }
      if (password !== cpassword) {
        return res.status(200).json({
          message: "password and confirm password not match",
        });
      } else {
        const hastPassword = await bcrypt.hash(password, 10);
        const hastCpassword = await bcrypt.hash(cpassword, 10);
        const user = await User.findOneAndUpdate(
          { email },
          { password: hastPassword, cpassword: hastCpassword }
        );
        return res.status(201).json({
          message: "password reset successfully",
        });
      }
    } else {
      return res.status(200).json({
        message: "verification code does not match",
      });
    }
  } catch (err) {
    next(createError(500, err));
  }
};
const profileUpdateController = async (req, res, next) => {
  try {
    const avatar = req.file.filename;
    const { _id, googleId } = req.session.user;
    if (_id) {
      const user = await User.findOneAndUpdate({ _id }, { imageUrl: avatar });
      const { imageUrl: deleteImage } = user;
      if (deleteImage === "images.png") {
        return res.json({ message: "profile updated successfully" });
      } else {
        const deleteImagePath = `./public/${deleteImage}`;
        fs.unlinkSync(deleteImagePath);
        res.json({ message: "profile updated successfully" });
      }
    }
    if (googleId) {
      const user = await User.findOneAndUpdate(
        { googleId },
        { imageUrl: avatar, updateCount: 1 }
      );
      const { imageUrl: deleteImage } = user;
      if (deleteImage === "images.png") {
        return res.json({ message: "profile updated successfully" });
      } else {
        const deleteImagePath = `./public/${deleteImage}`;
        if (fs.existsSync(deleteImagePath)) {
          fs.unlinkSync(deleteImagePath);
          res.json({ message: "profile updated successfully" });
        } else {
          res.json({ message: "profile updated successfully" });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
// user search by admin

const userSearchController = async (req,res,next) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({email})
    res.json(user)
  }catch(err){
    next(createError(500,err))
  }
}
// user modify by admin 
const userModifyController = async (req,res,next) => {
  try {
    const {id} = req.params
    const {role} = req.body
    const user = await User.findByIdAndUpdate(id,{usertype:role})
    res.status(200).json({message:'User Role Update Successfull'})
  }
  catch(err){
    next(createError(500,err))
  }
}
const logoutController = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({
      message: "logout successfully",
    });
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = {
  registerController,
  registerVerification,
  loginController,
  forgetPassword,
  resetPassword,
  authGoogle,
  profileUpdateController,
  userModifyController,
  userSearchController,
  logoutController,
};
