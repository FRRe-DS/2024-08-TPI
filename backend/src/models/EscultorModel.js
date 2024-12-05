const pool = require('../config/db');

class EscultorModel {
    // Crear un nuevo escultor
    static async createEscultor({ nombre_esc, apellido, pais,biografia,imagen_esc }) {
        
        const [result] = await pool.query(
            'INSERT INTO Escultores (nombre_esc, apellido,pais,biografia,imagen_esc) VALUES (?, ?, ?, ?, ?)',
            [nombre_esc, apellido, pais,biografia,imagen_esc ]
        );
        return { id_escultor: result.insertId,  nombre_esc, apellido, pais,biografia,imagen_esc};
    }

    // Obtener todos los Escultores
    static async getAllEscultores() {
        const [rows] = await pool.query('SELECT * FROM escultores e inner join nacionalidad n where e.pais = n.pais');
        return rows;
    }

    // Obtener Escultor por ID
    static async getEscultorById(id_escultor) {
        const [rows] = await pool.query('SELECT * FROM Escultores WHERE id_escultor = ?', [id_escultor]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // Actualizar Escultor por ID
    static async updateEscultor(id_escultor, { nombre_esc, apellido, biografia, pais, imagen_esc }) {
        const [result] = await pool.query(
            'UPDATE Escultores SET nombre_esc = ?, apellido = ?, biografia = ?, pais = ?, imagen_esc = ? WHERE id_escultor = ?',
            [nombre_esc, apellido, biografia, pais, imagen_esc, id_escultor]
        );
        return result.affectedRows > 0;
    }
    

    // Eliminar Escultor por ID
    static async deleteEscultor(id_escultor) {
        const [result] = await pool.query('DELETE FROM Escultores WHERE id_escultor = ?', [id_escultor]);
        return result.affectedRows > 0;
    }

    // Obtener escultores del evento activo
    static async getEscultoresActivos(){
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

}

module.exports = EscultorModel;
