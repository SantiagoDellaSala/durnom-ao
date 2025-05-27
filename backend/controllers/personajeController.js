const { Personaje, Bando, Clase, Raza } = require('../models');

const getPersonajesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const personajes = await Personaje.findAll({
      where: { userId },
      include: [Bando, Clase, Raza]
    });

    res.json(personajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener personajes' });
  }
};

// Crear personaje solo si usuario tiene menos de 6
const crearPersonaje = async (req, res) => {
  try {
    const { userId, nick_name, nivel, experiencia, bandoId, claseId, razaId } = req.body;

    // Contar personajes existentes
    const count = await Personaje.count({ where: { userId } });
    if (count >= 6) {
      return res.status(400).json({ message: 'No puedes tener más de 6 personajes' });
    }

    // Crear nuevo personaje
    const nuevoPersonaje = await Personaje.create({
      userId,
      nick_name,
      nivel: nivel || 1,
      experiencia: experiencia || 0,
      bandoId,
      claseId,
      razaId,
      posX: 50,
      posY: 50,
      mapa: 'mapa1'
    });


    res.status(201).json(nuevoPersonaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear personaje' });
  }
};

// Eliminar personaje por ID
const eliminarPersonaje = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await Personaje.destroy({ where: { id } });

    if (!eliminado) {
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }

    res.json({ message: 'Personaje eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar personaje' });
  }
};

module.exports = { getPersonajesByUser, crearPersonaje, eliminarPersonaje };
