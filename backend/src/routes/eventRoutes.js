const express = require('express');
const EventController = require('../controllers/EventController');

const router = express.Router();

// Obtener todos los eventos
router.get('/', EventController.getAllEvents);

// Crear un nuevo evento
router.post('/', EventController.createEvent);

// Obtener un evento por ID
router.get('/:id', EventController.getEventById);

// Actualizar un evento
router.put('/:id', EventController.updateEvent);

// Eliminar un evento
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
