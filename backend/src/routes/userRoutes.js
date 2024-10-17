const express = require('express');
const UserController = require('../controllers/UserController')

const router = express.Router();

// Obtener todos los Users
router.get('/', UserController.getAllUsers);

// Crear un nuevo Usero
router.post('/', UserController.createUser);

// Obtener un User por ID
router.get('/:email', UserController.getUserById);

router.get('/role/:email', UserController.getRoleByEmail);

// Actualizar un User
router.put('/:id', UserController.updateUser);

// Eliminar un User
router.delete('/:id', UserController.deleteUser);

module.exports = router;

