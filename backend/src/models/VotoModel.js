const pool = require('../config/db');

class VotoModel{

    static async getAllResults(){
        //Aca tendremos que realizar la logica para mostrar los resultados de la votacion
    }
    

    static async getVotesToEscultor(id_escultor, email){
        const [voto] = await pool.query('Select * from voto where id_escultor = ? and email = ?', [id_escultor, email]);
        if (voto.length === 0){
            return null
        }
        return voto;
    }

    static async createVoto(id_escultor, email, puntuacion) {
        
        const [voto] = await pool.query('Select * from voto where id_escultor = ? and email = ?', [id_escultor, email]);
        if (voto.length > 0){
            return  {error: 'Este usuario ya a votado a este escultor'}
        } 

        const [result] = await pool.query(
            'INSERT INTO voto (id_escultor, email, puntuacion) VALUES (?, ?, ?)', 
            [id_escultor, email, puntuacion]
        );

        // Devuelve el id generado por MySQL y los valores de id_escultor, email y puntuacion
        return { id: result.insertId, id_escultor, email, puntuacion };
    }
}

module.exports = VotoModel;