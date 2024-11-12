const EsculturaModel = require('../models/EsculturaModel');

class EsculturaController {
    // Crear una nueva escultura
    static async createEscultura(req, res) {
        const { nombre, descripcion, id_evento, id_escultor } = req.body;
        try {
          // Crear la escultura en la tabla 'esculturas'
          const escultura = await EsculturaModel.createEscultura({ nombre, descripcion, id_evento, id_escultor });
      
          // Guardar las imágenes en la tabla 'escultura_img'
          if (req.files) {
            for (const file of req.files) {
              await EsculturaModel.createEsculturaImagen({
                id_escultura: escultura.id_escultura,
                imagen_url: file.filename
              });
            }
          }
      
          res.status(201).json(escultura);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al crear la escultura' });
        }
      }

    // Obtener todas las esculturas
    static async getAllEsculturas(_req, res) {
        try {
            const esculturas = await EsculturaModel.getAllEsculturas();
            res.status(200).json(esculturas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las esculturas' });
        }
    }

    // Obtener escultura por ID
    static async getEsculturaById(req, res) {
        const { id_escultura } = req.params;
        try {
            const escultura = await EsculturaModel.getEsculturaById(id_escultura);
            if (!escultura) {
                return res.status(404).json({ error: 'Escultura no encontrada' });
            }
            res.status(200).json(escultura);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la escultura' });
        }
    }

    // Actualizar escultura
    static async updateEscultura(req, res) {
        const { id_escultura } = req.params;
        const { nombre, descripcion, img_url, id_evento, id_escultor } = req.body;
        try {
            const success = await EsculturaModel.updateEscultura(id_escultura, { nombre, descripcion, img_url, id_evento, id_escultor });
            if (!success) {
                return res.status(404).json({ error: 'Escultura no encontrada' });
            }
            res.status(200).json({ message: 'Escultura actualizada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la escultura' });
        }
    }

    // Eliminar escultura
    static async deleteEscultura(req, res) {
        const { id_escultura } = req.params;
        try {
            const success = await EsculturaModel.deleteEscultura(id_escultura);
            if (!success) {
                return res.status(404).json({ error: 'Escultura no encontrada' });
            }
            res.status(200).json({ message: 'Escultura eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la escultura' });
        }
    }
}

module.exports = EsculturaController;

