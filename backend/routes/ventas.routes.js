// ventas.routes.js - Rutas de ventas
const express = require('express');
const router = express.Router();
const ventasCtrl = require('../controllers/ventas.controller');

router.get('/', ventasCtrl.listar);
router.post('/', ventasCtrl.crear);
router.get('/dia', ventasCtrl.ventasDia);

module.exports = router;
