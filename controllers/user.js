const User = require('../models/user');


module.exports = (app) => {

  // Show user profile
  app.get('/users/:username', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).populate('posts');
      return res.render('users-show', { user });
    } catch (err) {
      console.log(err.message);
    }
  });

};
