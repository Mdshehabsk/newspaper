require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connect = require("./db/connection");
const { notFound, commonErrorHandler } = require("./middleware/errorhandler");
const postRoute = require("./router/postRoute");
const userRoute = require("./router/userRoute");
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(morgan("dev"));
app.use(passport.initialize());
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
    res.send('home route')
});

app.use('/api/v1/post',postRoute)
app.use('/api/v1/user',userRoute)


//error hander 
app.use(notFound)
app.use(commonErrorHandler)


// db connectoin
connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
