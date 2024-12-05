const express = require('express');
const UserController = require('../controllers/UserController')

const router = express.Router();

// Obtener todos los Users
router.get('/', UserController.getAllUsers);

// Crear un nuevo Usero
router.post('/', UserController.createUser);

// Obtener un User por ID
router.get('/:email', UserController.getUserByEmail);

router.get('/role/:email', UserController.getRoleByEmail);

// Actualizar un User
router.put('/:email', UserController.updateUser);


module.exports = router;

