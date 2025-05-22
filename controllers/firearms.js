const express = require('express');
const router = express.Router();
const Firearm = require('../models/firearm');

const ensureLoggedIn = require('../middleware/ensure-logged-in');

// GET /firearms — Show all firearms for the logged-in user
router.get('/', ensureLoggedIn, async (req, res) => {
  try {
    const query = { user: req.user._id };
    if (req.query.category && req.query.category !== '') {
      query.category = req.query.category;
    }
    const firearms = await Firearm.find(query).sort('-createdAt');
    res.render('firearms/index.ejs', {
      firearms,
      selectedCategory: req.query.category || ''
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/firearms — Get all firearms (API endpoint)
router.get('/api', ensureLoggedIn, async (req, res) => {
  try {
    const query = { user: req.user._id }; 
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

// GET /firearms/new — Show form to create a new firearm
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('firearms/new.ejs');
});

// POST /firearms — Create a new firearm
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    const firearmData = {
      ...req.body,
      purchaseDate: req.body.purchaseDate || undefined,
      purchasePrice: req.body.purchasePrice ? parseFloat(req.body.purchasePrice) : undefined,
      serialNumber: req.body.serialNumber || undefined,
      accessories: req.body.accessories || undefined,
      user: req.user._id,
    };
    await Firearm.create(firearmData);
    res.redirect('/firearms');
  } catch (err) {
    console.error(err);
    res.status(400).send('Failed to add firearm. Please check your input.');
  }
});

// PUT /firearms/:id — Update a firearm
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const updatedData = {
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      serialNumber: req.body.serialNumber || null,
      caliber: req.body.caliber,
      purchaseDate: req.body.purchaseDate || null,
      purchasePrice: req.body.purchasePrice || null,
      category: req.body.category,
      accessories: req.body.accessories ? req.body.accessories.split(',').map(item => item.trim()) : [],
      notes: req.body.notes || 'N/A',
    };
    const firearm = await Firearm.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updatedData,
      { new: true }
    );
    if (!firearm) return res.status(404).send('Firearm not found');
    res.redirect(`/firearms/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Update failed');
  }
});

// GET /firearms/:id/edit — Show edit form for a firearm
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    const firearm = await Firearm.findOne({ _id: req.params.id, user: req.user._id });
    if (!firearm) return res.status(404).send('Firearm not found');
    res.render('firearms/edit', { firearm });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /firearms/:id — Show single firearm details
router.get('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const firearm = await Firearm.findById(req.params.id);
    if (!firearm) {
      return res.status(404).send('Firearm not found');
    }
    res.render('firearms/show.ejs', { firearm });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /firearms/:id — Delete a firearm
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  const firearm = await Firearm.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!firearm) return res.status(404).send('Firearm not found');
  res.redirect('/firearms');
});

module.exports = router;