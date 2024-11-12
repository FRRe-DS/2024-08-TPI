const VotoModel = require('../models/VotoModel')

class VotoController{

    static async getAllResults(req, res){
            try {
                const resultados = await VotoModel.getAllResults()
                res.status(200).json(resultados)
            } catch (err){
                res.status(500).json({err : 'Error al obtener los resultados'})
                }
    }

    static async getVotesToEscultor(req, res){
        const {id_escultor, email} = req.params
        try{
            const voto = await VotoModel.getVotesToEscultor(id_escultor, email)
            res.status(200).json(voto)
        } catch (err){
            console.error('Error traer el escultor', err);
            res.status(500).json({err : 'Error al obtener el voto'})
        }
    }

    static async createVoto(req, res){
        const {id_escultor,email,puntuacion} = req.body
        try{
            const voto = await VotoModel.createVoto(id_escultor, email, puntuacion)
            res.status(201).json(voto);
        }catch (err){
            console.error('error al enviar la votacion',err)
            res.status(500).json(err)
        }

    }
}
module.exports = VotoController;