// controllers/ventas.controller.js - CRUD de ventas
const Venta = require('../models/Venta');
const Medicamento = require('../models/Medicamento');

exports.listar = async (req, res) => {
  const ventas = await Venta.find().populate('medicamentos.medicamento');
  res.json(ventas);
};
exports.crear = async (req, res) => {
  try {
    const { medicamentos, ...resto } = req.body;
    // medicamentos: { medicamento_0, cantidad_0, medicamento_1, cantidad_1, ... }
    let meds = [];
    Object.keys(medicamentos).forEach(key => {
      if (key.startsWith('medicamento_')) {
        const idx = key.split('_')[1];
        meds.push({
          medicamento: medicamentos[`medicamento_${idx}`],
          cantidad: Number(medicamentos[`cantidad_${idx}`])
        });
      }
    });
    // Verificar stock
    for (let m of meds) {
      const med = await Medicamento.findById(m.medicamento);
      if (!med || med.cantidad < m.cantidad) return res.status(400).json({ message: 'Stock insuficiente' });
    }
    // Descontar stock
    for (let m of meds) {
      await Medicamento.findByIdAndUpdate(m.medicamento, { $inc: { cantidad: -m.cantidad } });
    }
    // Calcular total
    let total = 0;
    for (let m of meds) {
      const med = await Medicamento.findById(m.medicamento);
      total += med.precio_venta * m.cantidad;
    }
    const venta = new Venta({ ...resto, medicamentos: meds, total });
    await venta.save();
    res.json(venta);
  } catch (err) {
    res.status(400).json({ message: 'Error registrando venta' });
  }
};
exports.ventasDia = async (req, res) => {
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  const maniana = new Date(hoy);
  maniana.setDate(hoy.getDate()+1);
  const ventas = await Venta.find({ fecha: { $gte: hoy, $lt: maniana } });
  const total = ventas.reduce((sum, v) => sum + v.total, 0);
  res.json({ total });
};
