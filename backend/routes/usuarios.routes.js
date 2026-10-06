// usuarios.routes.js - Rutas de gestión de usuarios
const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuarios.controller');

router.get('/', usuariosCtrl.listar);
router.post('/', usuariosCtrl.crear);
router.put('/:id', usuariosCtrl.editar);
router.delete('/:id', usuariosCtrl.eliminar);

module.exports = router;
