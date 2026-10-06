// models/Venta.js - Modelo de venta
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente_nombre: { type: String, required: true },
  cliente_cedula: { type: String, required: true },
  fecha: { type: Date, required: true },
  medicamentos: [
    {
      medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamento' },
      cantidad: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Venta', ventaSchema);
