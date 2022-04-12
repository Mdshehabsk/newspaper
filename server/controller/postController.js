const createError = require('http-errors')

const Post = require('../schema/postSchema');
const newsController = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({
                message: "please fill all the fields",
            });
        } else {
            const post = new Post({
                title,
                content,
                user: req._id,
            });
            await post.save();
            res.status(201).json({
                message: "post created successfully",
            });
        }
    } catch (err) {
        next(createError(500, err));
    }
}




module.exports = {
    newsController
}