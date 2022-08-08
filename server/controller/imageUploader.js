const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        if(!fs.existsSync('public')){
            fs.mkdirSync('public');
        }
      next(null, './public');
    },
    filename: function (req, file, next) {
        const fileExt = path.extname(file.originalname)
        const filename = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')+ '-' + Date.now()
        next(null, filename + fileExt)
    }
  })
const imageUpload = multer({ storage: storage })





module.exports = imageUpload

