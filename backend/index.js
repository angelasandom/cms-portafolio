require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); 

// Importar rutas
const projectRoutes = require('./routes/projectRoutes');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json()); // Sirve para leer JSON cuando envías datos desde un formulario

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'La API funciona!' 
  });
});

// Conectar url con archivo de rutas de proyectos
app.use('/api/projects', projectRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});