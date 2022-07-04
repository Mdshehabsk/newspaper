const Joi = require("joi");

const postValidation = async (req, res, next) => {
  const {title,description} = req.body
  const Schame = Joi.object({
    title: Joi.string()
      .min(10)
      .message("post title must be bigger than 10"),
    description: Joi.string()
    .min(50)
    .message('post content must be bigger than 50'),
  });
  const {error,value} = Schame.validate(req.body)
  if(error){
    res.status(201).json({
      message:error.details[0].message,
      path:error.details[0].path
    })
  }else{
    next()
  }
};

module.exports = postValidation;
