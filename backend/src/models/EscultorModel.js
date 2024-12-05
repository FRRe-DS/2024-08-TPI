const pool = require('../config/db');

class EscultorModel {
    // Crear un nuevo escultor
    static async createEscultor({ nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono }) {
        const [result] = await pool.query(
            'INSERT INTO Escultores (nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono]
        );
        return { id_escultor: result.insertId, nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono };
    }

    // Obtener todos los Escultores
    static async getAllEscultores() {
        const [rows] = await pool.query('SELECT * FROM escultores e INNER JOIN nacionalidad n ON e.pais = n.pais');
        return rows;
    }

    // Obtener Escultores activos
    static async getEscultoresActivos() {
        const query = ` 
            SELECT es.* 
            FROM escultores es 
            JOIN esculturas e ON es.id_escultor = e.id_escultor 
            JOIN eventos ev ON e.id_evento = ev.id 
            WHERE ev.activo = 'si'
        `;
        const [rows] = await pool.query(query);
        return rows;
    }

    // Obtener Escultor por ID
    static async getEscultorById(id_escultor) {
        const [rows] = await pool.query('SELECT * FROM Escultores WHERE id_escultor = ?', [id_escultor]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];  // Devuelve todos los campos, incluidos email y telefono
    }

    // Actualizar Escultor por ID
    static async updateEscultor(id_escultor, { nombre_esc, apellido, biografia, pais, imagen_esc, email, telefono }) {
        const [result] = await pool.query(
            'UPDATE Escultores SET nombre_esc = ?, apellido = ?, biografia = ?, pais = ?, imagen_esc = ?, email = ?, telefono = ? WHERE id_escultor = ?',
            [nombre_esc, apellido, biografia, pais, imagen_esc, email, telefono, id_escultor]
        );
        return result.affectedRows > 0;
    }

    // Eliminar Escultor por ID
    static async deleteEscultor(id_escultor) {
        const [result] = await pool.query('DELETE FROM Escultores WHERE id_escultor = ?', [id_escultor]);
        return result.affectedRows > 0;
    }
}

module.exports = EscultorModel;
