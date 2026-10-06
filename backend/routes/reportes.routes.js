// reportes.routes.js - Rutas de reportes
const express = require('express');
const router = express.Router();
const reportesCtrl = require('../controllers/reportes.controller');

router.get('/inventario', reportesCtrl.inventario);
router.get('/ventas', reportesCtrl.ventas);
router.get('/financiero', reportesCtrl.financiero);
router.get('/mas-vendidos', reportesCtrl.masVendidos);

module.exports = router;
