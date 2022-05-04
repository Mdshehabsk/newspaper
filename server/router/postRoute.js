const { newsController } = require('../controller/postController');
const isAuth = require('../middleware/checkAuth');
const Post = require('../schema/postSchema');
const postValidation = require('../validation/postValidation');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const post = await Post.find().populate('user');
    res.status(200).json(post);
})
router.post('/news',isAuth,postValidation,newsController)




module.exports = router;