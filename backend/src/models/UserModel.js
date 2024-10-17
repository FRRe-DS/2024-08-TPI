const pool = require('../config/db');

class UserModel {
    
    static async createUser({ name, nickname, email, role }) {
        const [existeusuario] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existeusuario.length > 0) {
            return { error: 'Usuario existente' };
        }
    
        const [result] = await pool.query(
            'INSERT INTO usuarios (name, nickname, email, role) VALUES (?, ?, ?, ?)',
            [name, nickname, email, role]
        );
        return { id: result.insertId, name, nickname, email, role };
    }
    

    // Obtener todos los user
    static async getAllUsers() {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    }

    // Obtener user por email
    static async getUserById(email) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
    static async getRoleByEmail(email) {
        const [rows] = await pool.query('SELECT role FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0].role; 
    }

    // Actualizar user 
    static async updateUser(email, {name, nickname, role }) {
        const [result] = await pool.query(
            'UPDATE eventos SET name = ?, nickname = ?, role = ? WHERE email = ?',
            [name, nickname, role, email]
        );
        return result.affectedRows > 0;
    }

    // Eliminar user
    static async deleteUser(email) {
        const [result] = await pool.query('DELETE FROM usuarios WHERE email = ?', [email]);
        return result.affectedRows > 0;
    }
}

module.exports = UserModel;
