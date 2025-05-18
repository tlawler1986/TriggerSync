const express = require('express');
const router = express.Router();
const Ammo = require('../models/ammo');
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// Route to render the ammo index page
router.get('/index', ensureLoggedIn, async (req, res) => {
  try {
    let ammo = await Ammo.findOne({ user: req.user._id });
    if (!ammo) {
      ammo = await Ammo.create({ user: req.user._id });
    }
    res.render('ammos/index', { ammo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to handle the form submission for creating new ammo
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const update = {
       '9mm': parseInt(req.body['9mm']) || 0,
      '40': parseInt(req.body['40']) || 0,
      '223_556': parseInt(req.body['223_556']) || 0,
      '308_762': parseInt(req.body['308_762']) || 0,
      '22LR': parseInt(req.body['22LR']) || 0,
      '12Gauge': parseInt(req.body['12Gauge']) || 0,
      '6_5Creedmoor': parseInt(req.body['6_5Creedmoor']) || 0,
      '300WinMag': parseInt(req.body['300WinMag']) || 0,
};
    await Ammo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      update
    );
    res.redirect('/ammos/index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Update failed');
  }
});

// Route to handle the form submission for updating ammo counts
 router.post('/update', ensureLoggedIn, async (req, res) => {
  const caliberToUpdate = req.body.update; 
  const newValue = parseInt(req.body[caliberToUpdate], 10);
  try {
    const ammo = await Ammo.findOne({ user: req.user._id });
    if (!ammo) {
      return res.status(404).send('Ammo record not found');
    }
    ammo[caliberToUpdate] = newValue;
    await ammo.save();
    res.redirect('/ammos/index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Update failed');
  }
});


module.exports = router;