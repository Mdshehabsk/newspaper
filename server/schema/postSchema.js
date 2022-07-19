const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text:{
    type:String
  },
  image: [
    {
      type:String,
      require:true
    }
  ],
  category:[
    {
      type:String,
      require:true
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
