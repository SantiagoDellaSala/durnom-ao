const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  try {
    const mail = req.body.mail.trim();
    const password = req.body.password.trim();
    const codigo_seguridad = req.body.codigo_seguridad.trim();

    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) return res.status(400).json({ message: 'El mail ya está en uso' });

    // Envío password sin hashear para que el hook en el modelo lo hashee
    const newUser = await User.create({
      mail,
      password,
      codigo_seguridad,
    });

    const token = jwt.sign({ id: newUser.id, mail: newUser.mail }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token, user: { id: newUser.id, mail: newUser.mail } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const mail = req.body.mail.trim();
    const password = req.body.password.trim();
    console.log('Login intentado con:', mail, password);

    const user = await User.findOne({ where: { mail } });
    if (!user) {
      console.log('No se encontró usuario');
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Usamos el método del modelo para validar la contraseña
    const validPassword = user.validPassword(password);

    console.log('password ingresada:', password);
    console.log('Hash en DB:', user.password);

    if (!validPassword) {
      console.log('password incorrecta');
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, mail: user.mail }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, mail: user.mail } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
