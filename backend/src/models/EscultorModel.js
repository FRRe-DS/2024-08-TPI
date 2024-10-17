const pool = require('../config/db');

class EscultorModel {
    // Crear un nuevo evento
    static async createEscultor({ nombre, apellido, nacionalidad,imagen_nacionalidad,biografia,imagen_esc }) {
        const [result] = await pool.query(
            'INSERT INTO Escultores (nombre_esc, apellido,nacionalidad,img_nacionalidad,biografia,imagen_esc) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, nacionalidad,imagen_nacionalidad,biografia,imagen_esc ]
        );
        return { id_escultor: result.insertId, nombre, apellido, nacionalidad,imagen_nacionalidad,biografia,imagen_esc  };
    }

    // Obtener todos los Escultores
    static async getAllEscultores() {
        const [rows] = await pool.query('SELECT * FROM Escultores');
        return rows;
    }

    // Obtener Escultoro por ID
    static async getEscultorById(id_escultor) {
        const [rows] = await pool.query('SELECT * FROM Escultores WHERE id = ?', [id_escultor]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // Actualizar Escultoro por ID
    static async updateEscultor(id_escultor, {nombre, apellido, nacionalidad,imagen_nacionalidad,biografia,imagen_esc }) {
        const [result] = await pool.query(
            'UPDATE Escultores SET nombre_esc = ?, apellido = ?, contacto = ?,nacionalidad = ?, img_nacionalidad = ?,biografia = ?, imagen_esc = ? WHERE id_escultor = ?',
            [nombre, apellido, nacionalidad,imagen_nacionalidad,biografia,imagen_esc, id_escultor ]
        );
        return result.affectedRows > 0;
    }

    // Eliminar Escultoro por ID
    static async deleteEscultor(id_escultor) {
        const [result] = await pool.query('DELETE FROM escultor WHERE id_escultor = ?', [id_escultor]);
        return result.affectedRows > 0;
    }
}

module.exports = EscultorModel;
