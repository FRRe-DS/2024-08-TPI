const UserModel = require('../models/UserModel');

class UserController {
    // Crear un nuevo usuario
    static async createUser(req, res) {
        const { nombre, email, password, role } = req.body;
        try {
            const user = await UserModel.createUser({ nombre, email, password, role });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    // Obtener todos los usuario
    static async getAllUsers(_req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }

    // Obtener usuario por ID
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    // Actualizar User
    static async updateUser(req, res) {
        const { id } = req.params;
        const { nombre, email, password, role } = req.body;
        try {
            const success = await UserModel.updateUser(id, { nombre, email, password, role  });
            if (!success) {
                return res.status(404).json({ error: 'User no encontrado' });
            }
            res.status(200).json({ message: 'User actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'User al actualizar el evento' });
        }
    }

    // Eliminar User
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const success = await UserModel.deleteEvent(id);
            if (!success) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el Usuario' });
        }
    }
}
    

   
module.exports = UserController;