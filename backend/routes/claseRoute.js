const express = require('express');
const router = express.Router();
const { Clase } = require('../models');

router.get('/', async (req, res) => {
  try {
    const clases = await Clase.findAll();
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener clases' });
  }
});

module.exports = router;
