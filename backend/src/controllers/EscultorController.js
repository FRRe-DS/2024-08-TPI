const EscultorModel = require('../models/EscultorModel');

class EscultorController {
    // Crear un nuevo Escultor
    static async createEscultor(req, res) {
        const { nombre_esc, apellido, nacionalidad, img_nacionalidad,biografia, imagen_esc } = req.body;
        try {
            const Escultor = await EscultorModel.createEscultor({ nombre_esc, apellido, nacionalidad, img_nacionalidad, biografia, imagen_esc });
            res.status(201).json(Escultor);
        } catch (error) {
            console.error('Error al obtener el rol del usuario:', error)
            res.status(500).json({ error: 'Error al crear el Escultor' });
        }
    }

    // Obtener todos los Escultoros
    static async getAllEscultores(req, res) {
        try {
            const Escultores = await EscultorModel.getAllEscultores();
            res.status(200).json(Escultores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los Escultores' });
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
        const { nombre_esc, apellido, nacionalidad,img_nacionalidad,biografia,imagen_esc } = req.body;
        try {
            const success = await EscultorModel.updateEscultor(id_escultor, { nombre_esc, apellido, nacionalidad, img_nacionalidad, biografia, imagen_esc });
            if (!success) {
                return res.status(404).json({ error: 'Escultor no encontrado' });
            }
            res.status(200).json({ message: 'Escultor actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el Escultoro' });
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
