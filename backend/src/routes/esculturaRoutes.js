const express = require('express');
const EsculturaController = require('../controllers/EsculturaController');

const router = express.Router();

// Obtener todos los escultura
router.get('/', EsculturaController.getAllEsculturas);

// Crear un nuevo escultura
router.post('/', EsculturaController.createEscultura);

// Obtener un escultura por ID
router.get('/:id', EsculturaController.getEsculturaById);

// Actualizar un escultura
router.put('/:id', EsculturaController.updateEscultura);

// Eliminar un escultura
router.delete('/:id', EsculturaController.deleteEscultura);

module.exports = router;
