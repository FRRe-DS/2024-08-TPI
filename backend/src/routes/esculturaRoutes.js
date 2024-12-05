const express = require('express');
const EsculturaController = require('../controllers/EsculturaController');
const { upload, procesarImagenesEsculturas } = require('../config/uploadMultiConfi');

const router = express.Router();

// Obtener todas las esculturas
router.get('/', EsculturaController.getAllEsculturas);

// Crear un nuevo escultura
router.post('/', upload, procesarImagenesEsculturas, EsculturaController.createEscultura);

// Obtener un escultura por ID
router.get('/:id_escultura', EsculturaController.getEsculturaById);

// Actualizar un escultura
router.put('/:id_escultura', upload, procesarImagenesEsculturas, EsculturaController.updateEscultura);

// Eliminar un escultura
router.delete('/:id_escultura', EsculturaController.deleteEscultura);

// Obtener imágenes de la escultura
router.get('/img_escultura/:id_escultura', EsculturaController.getImagenesByEsculturaId);

module.exports = router;
