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

// Ruta READ projects
router.get('/', getAllProjects);
router.get('/:id', getProjectById); 

// Ruta CREATE projects
router.post('/', createProject);

// Ruta UPDATE projects
router.put('/:id', updateProject);

// Ruta delete projects
router.delete('/:id', deleteProject);

module.exports = router;