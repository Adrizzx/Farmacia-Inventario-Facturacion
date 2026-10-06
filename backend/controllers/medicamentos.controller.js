// controllers/medicamentos.controller.js - CRUD de medicamentos
const Medicamento = require('../models/Medicamento');

exports.listar = async (req, res) => {
  const meds = await Medicamento.find();
  res.json(meds);
};
exports.crear = async (req, res) => {
  try {
    const med = new Medicamento(req.body);
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(400).json({ message: 'Error creando medicamento' });
  }
};
exports.alertasVencimiento = async (req, res) => {
  const hoy = new Date();
  const dias30 = new Date(hoy.getTime() + 30*24*60*60*1000);
  const meds = await Medicamento.find({ vencimiento: { $lte: dias30 } });
  if (meds.length === 0) return res.json({ mensaje: 'Sin alertas' });
  res.json({ mensaje: `${meds.length} medicamentos por vencer en 30 días` });
};
exports.totalInventario = async (req, res) => {
  const total = await Medicamento.countDocuments();
  res.json({ total });
};
