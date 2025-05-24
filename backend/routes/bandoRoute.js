const express = require('express');
const router = express.Router();
const { Bando } = require('../models');

router.get('/', async (req, res) => {
  try {
    const bandos = await Bando.findAll();
    res.json(bandos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener bandos' });
  }
});

module.exports = router;
