const express = require('express');
const router = express.Router();
const Firearm = require('../models/firearm');

const ensureLoggedIn = require('../middleware/ensure-logged-in');

router.get('/', ensureLoggedIn, async (req, res) => {
    try {
        const query = {};
        if (req.query.category && req.query.category !== '') {
            query.category = req.query.category;
        }        
        const firearms = await Firearm.find(query).sort('-createdAt');
        res.render('firearms/index.ejs', { firearms, selectedCategory: req.query.category || '' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/api', ensureLoggedIn, async (req, res) => {
    try {
        const query = {};
        if (req.query.category && req.query.category !== '') {
            query.category = req.query.category;
        }
        const firearms = await Firearm.find(query).sort('-createdAt');
        res.json(firearms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('firearms/new.ejs');
});

router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    const firearmData = {
      ...req.body,
      purchaseDate: req.body.purchaseDate || undefined,
      purchasePrice: req.body.purchasePrice ? parseFloat(req.body.purchasePrice) : undefined,
      serialNumber: req.body.serialNumber || undefined,
    };
    await Firearm.create(firearmData);
    res.redirect('/firearms');
  } catch (err) {
    console.error(err);
    res.status(400).send('Failed to add firearm. Please check your input.');
  }
});




module.exports = router;