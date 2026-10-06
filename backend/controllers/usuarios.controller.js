// controllers/usuarios.controller.js - CRUD de usuarios
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.listar = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};
exports.crear = async (req, res) => {
  try {
    const { password, ...resto } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ ...resto, password: hash });
    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ message: 'Error creando usuario' });
  }
};
exports.editar = async (req, res) => {
  try {
    const { password, ...resto } = req.body;
    let update = { ...resto };
    if (password) update.password = await bcrypt.hash(password, 10);
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ message: 'Error editando usuario' });
  }
};
exports.eliminar = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error eliminando usuario' });
  }
};
