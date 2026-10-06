// controllers/reportes.controller.js - Reportes y visualización
const Medicamento = require('../models/Medicamento');
const Venta = require('../models/Venta');

exports.inventario = async (req, res) => {
  const meds = await Medicamento.find();
  res.json(meds);
};
exports.ventas = async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
};
exports.financiero = async (req, res) => {
  // Simulación de reporte financiero
  const ventas = await Venta.find();
  const fechas = [];
  const ingresos = [];
  const costos = [];
  // Agrupar por día
  const agrupado = {};
  ventas.forEach(v => {
    const d = v.fecha.toISOString().slice(0,10);
    if (!agrupado[d]) agrupado[d] = { ingresos: 0, costos: 0 };
    agrupado[d].ingresos += v.total;
    // Simular costos (80% del total)
    agrupado[d].costos += v.total * 0.8;
  });
  for (let d in agrupado) {
    fechas.push(d);
    ingresos.push(agrupado[d].ingresos);
    costos.push(agrupado[d].costos);
  }
  res.json({ fechas, ingresos, costos });
};
exports.masVendidos = async (req, res) => {
  // Simulación de medicamentos más vendidos
  const ventas = await Venta.find().populate('medicamentos.medicamento');
  const conteo = {};
  ventas.forEach(v => {
    v.medicamentos.forEach(m => {
      const nombre = m.medicamento.nombre;
      conteo[nombre] = (conteo[nombre] || 0) + m.cantidad;
    });
  });
  const nombres = Object.keys(conteo);
  const cantidades = Object.values(conteo);
  res.json({ nombres, cantidades });
};
