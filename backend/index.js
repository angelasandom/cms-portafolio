require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


// RUTAS PÚBLICAS

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'La API funciona' 
  });
});

// Conectar url con archivo de rutas de proyectos
app.use('/api/projects', projectRoutes);


// RUTAS DE AUTENTICACIÓN Y SEGURIDAD

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al administrador en la BBDD
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    
    // Si no existe el usuario
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const admin = result.rows[0];

    // Comparar la contraseña enviada con la contraseña encriptada de la BBDD
    const validPassword = await bcrypt.compare(password, admin.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Generar el token (JWT)
    const token = jwt.sign(
      { id: admin.id_admin, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } 
    );

    // Enviar respuesta exitosa con el token
    res.json({ 
      success: true,
      message: 'Login exitoso', 
      token: token 
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// INICIO DEL SERVIDOR (Siempre debe ir al final)

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});