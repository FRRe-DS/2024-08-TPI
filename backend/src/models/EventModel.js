const pool = require('../config/db');

class EventModel {
    // Crear un nuevo evento
    static async createEvent({ nombre, fecha, lugar, descripcion, tematica }) {
        const [result] = await pool.query(
            'INSERT INTO eventos (nombre, fecha, lugar, descripcion, tematica) VALUES (?, ?, ?, ?, ?)',
            [nombre, fecha, lugar, descripcion, tematica]
        );
        return { id: result.insertId, nombre, fecha, lugar, descripcion, tematica };
    }

    // Obtener todos los eventos
    static async getAllEvents() {
        const [rows] = await pool.query('SELECT * FROM eventos');
        return rows;
    }

    // Obtener evento por ID
    static async getEventById(id) {
        const [rows] = await pool.query('SELECT * FROM eventos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // Actualizar evento por ID
    static async updateEvent(id, { nombre, fecha, lugar, descripcion, tematica }) {
        const [result] = await pool.query(
            'UPDATE eventos SET nombre = ?, fecha = ?, lugar = ?, descripcion = ?, tematica = ? WHERE id = ?',
            [nombre, fecha, lugar, descripcion, tematica, id]
        );
        return result.affectedRows > 0;
    }

    // Eliminar evento por ID
    static async deleteEvent(id) {
        const [result] = await pool.query('DELETE FROM eventos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = EventModel;
