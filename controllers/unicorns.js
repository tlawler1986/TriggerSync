const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../middleware/ensure-logged-in');

router.get('/', (req, res) => {
  res.send('List of all unicorns - not protected');
});


router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Create a unicorn!');
});

module.exports = router;