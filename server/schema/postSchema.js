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
  image: {
    type: String,
    require:true
  },
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
  createdAt: {
    type: Object,
    default: {
      date:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    },
  },
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
