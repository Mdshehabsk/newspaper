const { newPost, singlepost, categoryPost, postImage, deletePost } = require('../controller/postController');
const postImageUpload = require('../controller/postImageUpload');
const isAdmin = require('../middleware/checkAdminAuth');
const isAuth = require('../middleware/checkAuth');
const Post = require('../schema/postSchema');
const postValidation = require('../validation/postValidation');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const post = await Post.find().populate('user');
    res.status(200).json(post);
})
router.get('/:category',categoryPost)
router.get('/:category/singlepost/:postid',singlepost)
router.post('/news',isAuth,isAdmin,newPost)
router.post('/postimage',isAuth,isAdmin,postImage)
router.delete('/deletepost/:id',isAuth,isAdmin,deletePost)




module.exports = router;