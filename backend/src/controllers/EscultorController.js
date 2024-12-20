const EscultorModel = require('../models/EscultorModel');

class EscultorController {
    // Crear un nuevo Escultor
    static async createEscultor(req, res) {
        const { nombre_esc, apellido, pais, biografia, email, telefono } = req.body;
        const imagen_esc = req.file ? req.file.path.replace(/\\/g, '/') : null;  // Maneja la imagen si se carga
        try {
            const Escultor = await EscultorModel.createEscultor({ 
                nombre_esc, 
                apellido, 
                pais, 
                biografia, 
                imagen_esc, 
                email, 
                telefono
            });
            res.status(201).json(Escultor);
        } catch (error) {
            console.error('Error al crear el Escultor:', error);
            res.status(500).json({ error: 'Error al crear el Escultor' });
        }
    }

    // Obtener todos los Escultores
    static async getAllEscultores(req, res) {
        try {
            const Escultores = await EscultorModel.getAllEscultores();
            res.status(200).json(Escultores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los Escultores' });
        }
    }

    static async getEscultoresActivos(req, res) {
        try {
            const Escultores = await EscultorModel.getEscultoresActivos();
            res.status(200).json(Escultores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los Escultores en los eventos activos' });
        }
    }

    // Obtener Escultor por ID
    static async getEscultorById(req, res) {
        const { id_escultor } = req.params;
        try {
            const Escultor = await EscultorModel.getEscultorById(id_escultor);
            if (!Escultor) {
                return res.status(404).json({ error: 'Escultor no encontrado' });
            }
            res.status(200).json(Escultor);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el Escultor' });
        }
    }

    // Actualizar Escultor
    static async updateEscultor(req, res) {
        const { id_escultor } = req.params;
        const { nombre_esc, apellido, biografia, pais, imagen_esc, email, telefono } = req.body;
        try {
            const success = await EscultorModel.updateEscultor(id_escultor, { 
                nombre_esc, 
                apellido, 
                biografia, 
                pais, 
                imagen_esc, 
                email, 
                telefono 
            });
            if (success) {
                res.status(200).json({ message: 'Escultor actualizado correctamente' });
            } else {
                res.status(404).json({ error: 'Escultor no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el escultor:', error);
            res.status(500).json({ error: 'Error al actualizar el escultor' });
        }
    }

    // Eliminar Escultor
    static async deleteEscultor(req, res) {
        const { id_escultor } = req.params;
        try {
            const success = await EscultorModel.deleteEscultor(id_escultor);
            if (!success) {
                return res.status(404).json({ error: 'Escultor no encontrado' });
            }
            res.status(200).json({ message: 'Escultor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el Escultor' });
        }
    }
}

module.exports = EscultorController;
