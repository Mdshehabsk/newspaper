const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    googleId:{
        type: String,
    },
    password:{
        type: String,
    },
    cpassword:{
        type: String,
    },
    usertype:{
        type:String,
        enum:['user','moderator','admin','superadmin'],
        default:'user'
    },
    imageUrl:{
        type:String,
        default: 'images.png'
    },
    updateCount:{
        type:Number,
        default:0
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
