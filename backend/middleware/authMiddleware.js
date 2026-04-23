const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Buscar el token en las cabeceras de la petición
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token de seguridad.' });
  }

  try {
    // Limpiar el token antes de guardarlo
    const token = authHeader.replace('Bearer ', '');
    
    // Verificar si es real y no ha caducado
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardar los datos del admin en la request y dejarle pasar
    req.admin = verificado;
    next(); 
  } catch (error) {
    res.status(400).json({ error: 'Token no válido o caducado.' });
  }
};

module.exports = verificarToken;