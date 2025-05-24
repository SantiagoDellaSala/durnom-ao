const express = require('express');
const router = express.Router();
const { getPersonajesByUser, crearPersonaje, eliminarPersonaje } = require('../controllers/personajeController');

router.get('/user/:userId', getPersonajesByUser);
router.post('/', crearPersonaje);
router.delete('/:id', eliminarPersonaje);

module.exports = router;
