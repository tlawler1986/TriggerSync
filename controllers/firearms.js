const express = require('express');
const router = express.Router();
const Firearm = require('../models/firearm');

const ensureLoggedIn = require('../middleware/ensure-logged-in');

router.get('/', async (req, res) => {
    try {
        const firearms = await Firearm.find({}).sort('-createdAt');
        res.render('firearms/index.ejs', { firearms });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Create a unicorn!');
});

module.exports = router;