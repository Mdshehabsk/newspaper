const Joi = require("joi");
const registerValidation = async (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string()
      .min(6)
      .message("username must be bigger than 6 characters")
      .max(15)
      .message("username must be shorter than 15"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .message("must have two domain parts"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("password must be alphanumeric and number ")
      .min(6)
      .message("password must be bigger than 6")
      .max(10)
      .message("password must be smaller than 10"),
    cpassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("confirmm password must be alphanumeric and number ")
      .min(6)
      .message("confirm password must be bigger than 6")
      .max(10)
      .message("confirm password must be smaller than 10"),
  });
  const { error, value } = Schema.validate(req.body);
  if (error) {
    res.status(202).json({
      message: error.details[0].message,
      path: error.details[0].path,
    });
  } else {
    next();
  }
};

module.exports = registerValidation;
