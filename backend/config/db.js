// Cargar las variables de .env
require('dotenv').config();
const { Pool } = require('pg');

// Configurar el pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necesario para que la conexión encriptada funcione
  }
});

// Función para probar la conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a Supabase.', res.rows[0].now);
  }
});

module.exports = pool;