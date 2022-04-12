const { newsController } = require('../controller/postController');
const isAuth = require('../middleware/checkAuth');
const Post = require('../schema/postSchema');

const router = require('express').Router();


router.get('/',isAuth, async (req, res) => {
    const post = await Post.find().populate('user');
    res.json(post);
})
router.post('/news',isAuth,newsController)




module.exports = router;