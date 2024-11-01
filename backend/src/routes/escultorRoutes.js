const express = require('express');
const EscultorController = require('../controllers/EscultorController');
const { upload, procesarImagen } = require('../config/uploadConfig');

const router = express.Router();

// Obtener todos los escultores
router.get('/', EscultorController.getAllEscultores);

// Crear un nuevo escultor
router.post('/', upload.single('imagen_esc'), procesarImagen ,EscultorController.createEscultor );

// Obtener un escultor por ID
router.get('/:id_escultor', EscultorController.getEscultorById);

// Actualizar un escultor
router.put('/:id_escultor', EscultorController.updateEscultor);

// Eliminar un escultores
router.delete('/:id_escultor', EscultorController.deleteEscultor);

module.exports = router;
