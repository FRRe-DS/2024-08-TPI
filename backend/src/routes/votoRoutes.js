const express = require('express');
const votoController = require('../controllers/VotoController')

const router = express.Router();

//Obtener todos los Resultados de una escultura en un evento especifico
router.get('/resultado/:id', votoController.getAllResults)

//Obtener votacion para verificar si el Usuario ya voto a ese escultura en ese evento.
router.get('/:id_escultor/:email', votoController.getVotesToEscultor)

//Cargar votacion
router.post('/', votoController.createVoto)


module.exports = router;

