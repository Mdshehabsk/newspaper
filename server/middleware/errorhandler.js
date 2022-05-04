const createError = require("http-errors");
const notFound = (req, res, next) => {
  next(createError(404, "Page not found"));
};

const commonErrorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        console.log('headers already sent');
    }
    if(err){
        if(err.status===405){
            res.redirect('http://localhost:3000/googlelogin');
        }
        if(err.message){
            res.status(err.status || 400).json(err.message)
        }else{
            res.json(err)
        }
    }
}

module.exports = {
    notFound,
    commonErrorHandler
}
