const Post = require('../models/post');

module.exports = (app) => {

  // Root path
  app.get('/', (req, res) => {
    res.render('home');
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
