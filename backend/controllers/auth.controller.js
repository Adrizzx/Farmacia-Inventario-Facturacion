// controllers/auth.controller.js - Controlador de autenticación
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ correo: username });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, usuario: user });
  } catch (err) {
    res.status(500).json({ message: 'Error en login' });
  }
};
