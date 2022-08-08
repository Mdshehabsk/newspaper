const Joi = require("joi");
const resetPasswordValidation = async (req, res, next) => {
  const {password,cpassword} = req.body
  const Schema = Joi.object({
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
  const { error, value } = Schema.validate({password,cpassword});
  if (error) {
    res.status(202).json({
      message: error.details[0].message,
      path: error.details[0].path,
    });
  } else {
    next();
  }
};

module.exports = resetPasswordValidation;