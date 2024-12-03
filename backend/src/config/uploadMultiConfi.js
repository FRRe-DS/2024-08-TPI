const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Configuración de multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const procesarImagenesEsculturas = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const { nombre_esc, apellido, id_escultor } = req.body;
  const nombreBase = `${nombre_esc || 'escultor'}_${apellido || 'apellido'}_${id_escultor || 'id'}`;

  try {
    
    const processedImages = await Promise.all(req.files.map(async (file, index) => {
      const nombreImg = `${nombreBase}-escultura-${index + 1}.webp`;
      const outputPath = path.join('images', `escultor_${id_escultor}`, nombreImg);

      const dir = path.dirname(outputPath); // obtenemos el directorio donde se va a guardar cada imagen
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Crear el directorio, incluyendo subdirectorios si no existen
      }

      // Procesar la imagen con Sharp y la guarda en el directorio
      await sharp(file.buffer)
        .webp({ quality: 80 }) //aca la transformamos al formato .webp con calidad de 80
                                //mantiene la calidad visual pero comprimida en comparacion con otros formatos
        .toFile(outputPath);

      return {
        originalname: file.originalname,
        path: outputPath,
        filename: nombreImg,
      };
    }));

    // Almacenamos toda la info de las imágenes trasformadas en req.files
    req.files = processedImages;
    next();
  } catch (error) {
    console.error('Error al procesar las imágenes', error);
    res.status(500).json({ error: 'Error al procesar las imágenes' });
  }
};

module.exports = { upload: upload.array('imagenes'), procesarImagenesEsculturas };
//como en este programa trabajamos con varias imagenes utilizamos el uploud.array de multer