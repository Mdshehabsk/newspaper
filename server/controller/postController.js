const createError = require("http-errors");
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const Post = require("../schema/postSchema");
const newPost = async (req, res, next) => {
  try {
    const form = formidable({multiples:true})
    form.parse(req,async (err,field,files)=>{

      const { title, description,category,postImage,text } = field;
      console.log(postImage)
    if (!title || !description || !postImage ||!category ) {
      res.status(201).json({
        message: "please fill all the fields",
      });
    }else if(title.length <= 10){
      res.status(201).json({message:'tilte must be bigger than 10 charectar'})
    } else if(description.length <= 50){
      res.status(201).json({message:"description must be bigger than 50 charectar"})
    }
     else {
      const post = new Post({
        title,
        description,
        image: `/post/${postImage}`,
        text,
        category:category.split(','),
        user: req._id,
      });
      await post.save();
      res.status(200).json({
        message: "post created successfully",
      });
    }
    })
    
  } catch (err) {
    next(createError(500, err));
  }
};
// post image 
const postImage = async (req,res) => {
  const form = formidable({multiples:true})
  form.parse(req,async (err,field,files)=> {
    const imageArr = []
    if(Array.isArray(files.postImage)){
      for(const i in files.postImage){
        const oldPath = files.postImage[i].filepath
        const base = path.join(__dirname, '../')
        const imageName = Date.now() + Math.floor(Math.random() * 2 ) + files.postImage[i].originalFilename
        const newPath = `${base}/public/post/${imageName}`
        const rawdata = fs.readFileSync(oldPath)
        fs.writeFileSync(newPath,rawdata)
        imageArr[i] = imageName
      }
    }
    else{
      const oldPath = files.postImage.filepath
      const base = path.join(__dirname, '../')
      const imageName = Date.now() + Math.floor(Math.random() * 2 ) + files.postImage.originalFilename
      const newPath = `${base}/public/post/${imageName}`
      const rawdata = fs.readFileSync(oldPath)
      fs.writeFileSync(newPath,rawdata)
      imageArr[0] = imageName
    }
    res.status(200).json({image:imageArr})
  })
}

//single post 

const singlepost = async (req,res,next) =>{
  try{
    const {category,postid} = req.params
    const singlepost = await Post.findById(postid)
    res.status(200).json(singlepost)
  }catch(err){
    next(createError(500,err))
  }
}

//category post

const categoryPost = async (req,res,next) =>{
  try{
    const {category} = req.params
    const post = await Post.find({category})
    res.status(200).json(post)
  }catch(err){
    next(createError(500,err))
  }
}
//post delete 

const deletePost = async (req,res,next) => {
  const {id} = req.params 
  const post = await Post.findByIdAndDelete(id)
  if(post){
   return res.status(200).json({message:'Post delete successfully'})
  }
}


module.exports = {
  newPost,
  postImage,
  singlepost,
  categoryPost,
  deletePost
};
