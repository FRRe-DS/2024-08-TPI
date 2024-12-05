const UserModel = require('../models/UserModel');

class UserController {
    // Crear un nuevo usuario
    static async createUser(req, res) {
        const { name, nickname, email, role } = req.body;
        if (!name || !nickname || !email || !role) {
            return res.status(400).json({ message: 'Faltan campos obligatorios.' });
        }
        try {
            const user = await UserModel.createUser({name, nickname, email, role });
            res.status(201).json(user);
        } catch (error) {
            console.error('Error al crear el usuario', error);
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

    // Obtener usuario por email
    static async getUserByEmail(req, res) {
        const { email } = req.params;
        try {
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    //Obtener el role del usuario

    static async getRoleByEmail(req, res) {
        const { email } = req.params; // Extrae el email de los parámetros de la solicitud.
    
        // Validación del email
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Email inválido' });
        }
    
        try {
            const role = await UserModel.getRoleByEmail(email); // Llama al método del modelo para obtener el rol.
            if (!role) {
                return res.status(404).json({ error: 'Usuario no encontrado' }); // Si no se encuentra el rol, devuelve un error 404.
            }
            res.status(200).json({ email, role }); // Devuelve el rol del usuario junto con el email.
        } catch (error) {
            console.error('Error al obtener el rol del usuario:', error); // Log del error para el desarrollo.
            res.status(500).json({ error: 'Error al obtener el rol del usuario' }); // Manejo de errores.
        }
    }
    // Actualizar User
    static async updateUser(req, res) {
        const { email } = req.params;
        const { role } = req.body;
        try {
            const success = await UserModel.updateUser(email, {  role  });
            if (!success) {
                return res.status(404).json({ error: 'User no encontrado' });
            }
            res.status(200).json({ message: 'User actualizado correctamente' });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'User al actualizar el evento' });
        }
    }

    // Eliminar User
    static async deleteUser(req, res) {
        const { email } = req.params;
        try {
            const success = await UserModel.deleteEvent(email);
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