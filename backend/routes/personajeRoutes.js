const express = require('express');
const router = express.Router();
const { getPersonajesByUser, crearPersonaje, eliminarPersonaje, actualizarPosicion } = require('../controllers/personajeController');

router.get('/user/:userId', getPersonajesByUser);
router.post('/', crearPersonaje);
router.delete('/:id', eliminarPersonaje);
router.put('/:id/posicion', actualizarPosicion);

module.exports = router;
