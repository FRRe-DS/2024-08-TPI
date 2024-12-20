const express = require('express');
require('dotenv').config();
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const escultorRoutes = require('./routes/escultorRoutes');
const esculturaRoutes = require('./routes/esculturaRoutes');
const votoRoutes = require('./routes/votoRoutes');
const tokenRoutes = require('./routes/tokenRoutes')
const app = express();
const cors = require('cors');

// Middleware para procesar JSON
app.use(express.json());

app.use(cors({
   origin: '*'
  }));

// Rutas de eventos
app.use('/api/eventos', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/escultura', esculturaRoutes);
app.use('/api/escultor', escultorRoutes);
app.use('/api/voto', votoRoutes);
app.use('/api/token', tokenRoutes);



app.use('/images', express.static('images')); // para que se renderice en tu localhost la imagen


// Manejo de errores genéricos
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
