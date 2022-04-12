const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../schema/userSchema");
const registerController = async (req, res, next) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      res.status(400).json({
        message: "please fill all the fields",
      });
    } else if (password !== cpassword) {
      res.status(400).json({
        message: "password does not match",
      });
    } else {
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(400).json({
          message: "user already exist",
        });
      } else {
        const hastPassword = await bcrypt.hash(password, 10);
        const hastCpassword = await bcrypt.hash(cpassword, 10);
        const user = new User({
          ...req.body,
          password: hastPassword,
          cpassword: hastCpassword,
        });
        await user.save();
        res.status(201).json({
          message: "user created successfully",
        });
      }
    }
  } catch (err) {
    next(createError(500, err));
  }
};



const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "please fill all the fields",
            });
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({
                    message: "user does not exist",
                });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(400).json({
                        message: "password does not match",
                    });
                } else {
                  const {_id, name, email, usertype,modelName} = user;
                  req.session.user= {
                    _id,
                    name,
                    email,
                    usertype,
                    modelName
                }
                    req.session.Auth = true;
                    res.status(200).json({
                        message: "login successfully",
                    });

                }
            }
        }
    } catch (err) {
        next(createError(500, err));
    }
};

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
  loginController,
  logoutController
};
