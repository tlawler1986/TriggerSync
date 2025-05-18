const express = require('express');
const router = express.Router();
const Ammo = require('../models/ammo');

const ensureLoggedIn = require('../middleware/ensure-logged-in');

router.get('/index', ensureLoggedIn, async (req, res) => {
    try {
        const ammo = await Ammo.findOne({ user: req.user._id });
        res.render('ammos/index', { ammo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

 


module.exports = router;