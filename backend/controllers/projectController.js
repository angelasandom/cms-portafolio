const pool = require('../config/db');

// READ project (GET)
const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Buscar proyecto por id
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id_project = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo el proyecto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// CREATE porject (POST)
const createProject = async (req, res) => {
  const { title, description_es, description_en, image_url, github_url, live_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description_es, description_en, image_url, github_url, live_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description_es, description_en, image_url, github_url, live_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creando proyecto:', error);
    res.status(500).json({ error: 'Error interno guardando el proyecto' });
  }
};

// UPDATE project (PUT)
const updateProject = async (req, res) => {
  const { id } = req.params; // Capturar ID proyecto
  const { title, description_es, description_en, image_url, github_url, live_url } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE projects 
       SET title = $1, description_es = $2, description_en = $3, image_url = $4, github_url = $5, live_url = $6 
       WHERE id_project = $7 RETURNING *`,
      [title, description_es, description_en, image_url, github_url, live_url, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error actualizando proyecto:', error);
    res.status(500).json({ error: 'Error interno actualizando' });
  }
};

// DELETE project (DELETE)
const deleteProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM projects WHERE id_project = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json({ message: 'Proyecto eliminado con éxito' });
  } catch (error) {
    console.error('Error borrando proyecto:', error);
    res.status(500).json({ error: 'Error interno borrando' });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };