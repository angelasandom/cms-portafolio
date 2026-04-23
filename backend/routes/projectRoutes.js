const express = require('express');
const router = express.Router();

// Importar funciones del controlador
const { 
  getAllProjects,
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');

// Importar el middleware de seguridad 
const verificarToken = require('../middleware/authMiddleware');

// RUTAS PÚBLICAS

// Ruta READ projects
router.get('/', getAllProjects);
router.get('/:id', getProjectById); 


// RUTAS PRIVADAS (Solo el Admin con Token)

// Ruta CREATE projects
router.post('/', verificarToken, createProject);

// Ruta UPDATE projects
router.put('/:id', verificarToken, updateProject);

// Ruta DELETE projects
router.delete('/:id', verificarToken, deleteProject);

module.exports = router;