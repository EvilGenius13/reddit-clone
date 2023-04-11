const Post = require('../models/post');

module.exports = (app) => {

  // Root path
  app.get('/', (req, res) => {
    Post.find({}).lean()
    .then((posts) => res.render('posts-index', { posts }))
    .catch(err => console.log(err));
  });

  // New Post
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  });

  // Create
  app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);

    post.save()
      .then(() => {
        res.redirect('/')
      })
      .catch(err => console.log(err))
  });

};
