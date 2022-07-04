const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        if(!fs.existsSync('public')){
            fs.mkdirSync('public');
        }
        if(!fs.existsSync('public/post')){
            fs.mkdirSync('public/post')
        }
      next(null, './public/post');
    },
    filename: function (req, file, next) {
        const fileExt = path.extname(file.originalname)
        const filename = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')+ '-' + Date.now()
        next(null, filename + fileExt)
    }
  })
const postImageUpload = multer({ storage: storage })





module.exports = postImageUpload