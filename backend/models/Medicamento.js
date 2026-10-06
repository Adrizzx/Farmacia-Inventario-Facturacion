// models/Medicamento.js - Modelo de medicamento
const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  principio: { type: String, required: true },
  laboratorio: { type: String, required: true },
  codigo_barras: { type: String, required: true, unique: true },
  vencimiento: { type: Date, required: true },
  lote: { type: String, required: true },
  categoria: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio_compra: { type: Number, required: true },
  precio_venta: { type: Number, required: true }
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);
