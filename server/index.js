require("dotenv").config();
const express = require("express");
const formData = require('express-form-data')
const morgan = require("morgan");
const cors = require("cors");
// const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connect = require("./db/connection");
const { notFound, commonErrorHandler } = require("./middleware/errorhandler");
const postRoute = require("./router/postRoute");
const userRoute = require("./router/userRoute");
const roleAuth = require('./auth/roleAuth')
const app = express();
// app.use(formData.stream())
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(morgan("dev"));
// app.use(passport.initialize());
const mongoStore = MongoStore.create({
  mongoUrl:process.env.MONGO_URI,
  collectionName:'sessions'
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}))
app.get('/', (req, res) => {
    res.render('index',{code:12345})
});

app.use('/api/v1/post',postRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/roleauth',roleAuth)

//error hander 
app.use(notFound)
app.use(commonErrorHandler)


// db connectoin
connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
