const multer = require('multer');
const path = require('path');
const sharp = require('sharp')



const storage = multer.memoryStorage();

const uploadOne = multer({storage: storage});

const procesarImagen = async (req, res, next) => {
    if(!req.file){
        return next();
    }

    const {nombre_esc, apellido} = req.body;
    const nombreImg = `${nombre_esc || 'escultor'}_${apellido || 'apellido'}-1.webp`
    const outpuPath = path.join('images', nombreImg)

    try {
        await sharp(req.file.buffer)
            .webp({ quality: 80})//aca la transformamos al formato .webp con calidad de 80
            //mantiene la calidad visual pero comprimida en comparacion con otros formatos
            .toFile(outpuPath)

            req.file.path = outpuPath
            req.file.filename = nombreImg
            next();
    }catch (error){
        console.error('error al procesar la imagen', error)
        res.status(500).json({error:'error al procesar img'})
    }
}

module.exports = { uploadOne, procesarImagen };