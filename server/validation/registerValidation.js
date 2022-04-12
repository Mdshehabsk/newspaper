const Joi = require("joi");
const registerValidation = async (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string()
      // .required()
      .min(3)
      .message("username must be bigger than 3")
      .max(15)
      .message("usernaem must be shorter than 15"),
    email: Joi.string()
      // .required()
      // .message("email is required")
      .email({ minDomainSegments: 2 })
      .message("must have two domain parts"),
    password: Joi.string()
      // .required()
      // .message("password is required")
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.string()
      // .required()
      // .message("confirm-password is required")
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error, value } = Schema.validate(req.body);
  if(error){
    res.json({
      message:error.details[0].message,
      path:error.details[0].path
    })
  }else{
    next()
  }

};

module.exports = registerValidation;
