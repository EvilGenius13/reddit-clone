const Post = require('../models/post');
const checkAuth = require('../middleware/checkAuth');

module.exports = (app) => {
  // Apply the checkAuth middleware to all routes in this file
  app.use(checkAuth);

  // Root path
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      const currentUser = req.user;
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // New Post
  app.get('/posts/new', checkAuth, (req, res) => {
    if (req.user) {
      res.render('posts-new');
    } else {
      return res.status(401).send('Unauthorized'); // UNAUTHORIZED
    }
  });

  // Create Post
  app.post('/posts/new', checkAuth, async (req, res) => {
    const post = new Post(req.body);
  
    try {
      await post.save();
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  });

  // Show Post
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments')
      .then((post) => res.render('posts-show', { post }))
    } catch (err) {
      console.log(err.message);
    }
  });

  // Subreddit
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });
};

// Stopped at Product so far