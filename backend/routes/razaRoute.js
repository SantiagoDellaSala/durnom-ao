const express = require('express');
const router = express.Router();
const { Raza } = require('../models');

router.get('/', async (req, res) => {
  try {
    const razas = await Raza.findAll();
    res.json(razas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener razas' });
  }
});

module.exports = router;
