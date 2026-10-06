// medicamentos.routes.js - Rutas de medicamentos
const express = require('express');
const router = express.Router();
const medicamentosCtrl = require('../controllers/medicamentos.controller');

router.get('/', medicamentosCtrl.listar);
router.post('/', medicamentosCtrl.crear);
router.get('/alertas', medicamentosCtrl.alertasVencimiento);
router.get('/total', medicamentosCtrl.totalInventario);

module.exports = router;
