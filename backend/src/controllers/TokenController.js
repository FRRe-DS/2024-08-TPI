const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

class TokenConstroller{
    static async Token(req, res){
        const {id} = req.params

        const token = jwt.sign({
            id,
            exp: Date.now() + 60 
        }, secret)

        res.send({ token })
    }

    static async getVerifyToken(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const payload = jwt.verify(token, secret)
            
            if ((Date.now()) < (payload.exp)){
                return res.status(401).send({ error: 'EL Token Expiro' })
            }
            
            res.send({valido: true});
        } catch(error){
        console.error(error);
        res.status(401).send({ error: error.message})
        }
    }
}

module.exports = TokenConstroller