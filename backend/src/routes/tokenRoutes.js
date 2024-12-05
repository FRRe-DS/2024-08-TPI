const express = require('express')
const TokenController = require('../controllers/TokenController')


const router = express.Router();


router.post('/:id', TokenController.Token)

router.get('/Verifytoken', TokenController.getVerifyToken)


module.exports = router;