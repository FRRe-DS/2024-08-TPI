const express = require('express');
const EscultorController = require('../controllers/EscultorController');
const { uploadOne, procesarImagen} = require('../config/uploadOneConfig');

const router = express.Router();

// Obtener todos los escultores
router.get('/', EscultorController.getAllEscultores);

// Crear un nuevo escultor
router.post('/', uploadOne.single('imagen_esc'), procesarImagen ,EscultorController.createEscultor );

// Obtener un escultor por ID
router.get('/:id_escultor', EscultorController.getEscultorById);

// Actualizar un escultor
router.put('/:id_escultor',uploadOne.single('imagen_esc'), procesarImagen, EscultorController.updateEscultor);

// Eliminar un escultores
router.delete('/:id_escultor', EscultorController.deleteEscultor);

// Obtener escultores del evento activo
router.get('/evento/activo', EscultorController.getEscultoresActivos);

module.exports = router;
