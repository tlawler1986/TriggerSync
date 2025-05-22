const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const Firearm = require('../models/firearm');
const ensureLoggedIn = require('../middleware/ensure-logged-in');


router.get('/index', ensureLoggedIn, async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading users');
  }
});

router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid user ID');
  }
  try {
    const viewedUser = await User.findById(req.params.id).exec();
    if (!viewedUser) return res.status(404).send('User not found');
    const firearms = await Firearm.find({ user: viewedUser._id }).exec();
    res.render('users/show.ejs', {
      firearms,        
      viewedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading user's inventory");
  }
});


module.exports = router;
