const Comment = require('../models/comment');
const Post = require('../models/post');
const checkAuth = require('../middleware/checkAuth');

module.exports = (app) => {
  // Apply the checkAuth middleware to all routes in this file
  app.use(checkAuth);

  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      // INSTANTIATE INSTANCE OF MODEL
      const comment = new Comment(req.body);

      // SET AUTHOR ID
      comment.author = req.user._id;

      // SAVE INSTANCE OF Comment MODEL TO DB
      await comment.save();

      // FIND PARENT POST
      const post = await Post.findById(req.params.postId);

      // ADD COMMENT REFERENCE TO POST
      post.comments.unshift(comment);
      await post.save();

      // REDIRECT TO POST SHOW
      return res.redirect(`/posts/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  });
};