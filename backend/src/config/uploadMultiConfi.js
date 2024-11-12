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
    // Procesar cada imagen en req.files
    const processedImages = await Promise.all(req.files.map(async (file, index) => {
      const nombreImg = `${nombreBase}-escultura-${index + 1}.webp`;
      const outputPath = path.join('images', `escultor_${id_escultor}`, nombreImg);

      // Crear el directorio si no existe
      const dir = path.dirname(outputPath); // Obtener el directorio donde se guardará la imagen
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Crear el directorio, incluyendo subdirectorios si no existen
      }

      // Procesar la imagen con Sharp y guardarla en el directorio de destino
      await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Retornar la información de la imagen procesada
      return {
        originalname: file.originalname,
        path: outputPath,
        filename: nombreImg,
      };
    }));

    // Almacenar la información de las imágenes procesadas en req.files
    req.files = processedImages;
    next();
  } catch (error) {
    console.error('Error al procesar las imágenes', error);
    res.status(500).json({ error: 'Error al procesar las imágenes' });
  }
};

// Cambia esto para usar upload.array y manejar múltiples imágenes de esculturas
module.exports = { upload: upload.array('imagenes'), procesarImagenesEsculturas };
