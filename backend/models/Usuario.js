// models/Usuario.js - Modelo de usuario
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  fecha_nacimiento: { type: Date, required: true },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true },
  rol: { type: String, enum: ['farmaceutico', 'administrador', 'vendedor'], required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
