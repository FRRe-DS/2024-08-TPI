const express = require('express');
const EscultorController = require('../controllers/EscultorController');

const router = express.Router();

// Obtener todos los escultores
router.get('/', EscultorController.getAllEscultores);

// Crear un nuevo escultor
router.post('/', EscultorController.createEscultor);

// Obtener un escultor por ID
router.get('/:id_escultor', EscultorController.getEscultorById);

// Actualizar un escultor
router.put('/:id_escultor', EscultorController.updateEscultor);

// Eliminar un escultores
router.delete('/:id_escultor', EscultorController.deleteEscultor);

module.exports = router;
