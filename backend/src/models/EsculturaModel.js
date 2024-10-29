const pool = require('../config/db');

class EsculturaModel {
    // Crear una nueva escultura
    static async createEscultura({ nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor }) {
        const [result] = await pool.query(
            'INSERT INTO esculturas (nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor]
        );
        return { id_escultura: result.insertId, nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor };
    }

    // Obtener todas las esculturas
    static async getAllEsculturas() {
        const [rows] = await pool.query('SELECT * FROM esculturas');
        return rows;
    }

    // Obtener escultura por ID
    static async getEsculturaById(id_escultura) {
        const [rows] = await pool.query('SELECT * FROM esculturas WHERE id_escultura = ?', [id_escultura]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // Actualizar escultura por ID
    static async updateEscultura(id_escultura, { nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor }) {
        const [result] = await pool.query(
            'UPDATE esculturas SET nombre = ?, descripcion = ?, tematica = ?, img_url = ?, fecha_creacion = ?, id_evento = ?, id_escultor = ? WHERE id_escultura = ?',
            [nombre, descripcion, tematica, img_url, fecha_creacion, id_evento, id_escultor, id_escultura]
        );
        return result.affectedRows > 0;
    }

    // Eliminar escultura por ID
    static async deleteEscultura(id_escultura) {
        const [result] = await pool.query('DELETE FROM esculturas WHERE id_escultura = ?', [id_escultura]);
        return result.affectedRows > 0;
    }
}

module.exports = EsculturaModel;
