const pool = require('../config/db');

// GET

const getAllProjects = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id_technology', t.id_technology,
              'name', t.name,
              'icon_url', t.icon_url
            )
          ) FILTER (WHERE t.id_technology IS NOT NULL), '[]'
        ) AS technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id_project = pt.id_project
      LEFT JOIN technologies t ON pt.id_technology = t.id_technology
      GROUP BY p.id_project
      ORDER BY p.created_at DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id_technology', t.id_technology,
              'name', t.name,
              'icon_url', t.icon_url
            )
          ) FILTER (WHERE t.id_technology IS NOT NULL), '[]'
        ) AS technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id_project = pt.id_project
      LEFT JOIN technologies t ON pt.id_technology = t.id_technology
      WHERE p.id_project = $1
      GROUP BY p.id_project;
    `;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo el proyecto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST

const createProject = async (req, res) => {
  const { title, description_es, description_en, image_url, github_url, live_url, technologies } = req.body;
  
  try {
    await pool.query('BEGIN'); 

    const resultProject = await pool.query(
      `INSERT INTO projects (title, description_es, description_en, image_url, github_url, live_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description_es, description_en, image_url, github_url, live_url]
    );
    const newProject = resultProject.rows[0];

    if (technologies && technologies.length > 0) {
      for (const techName of technologies) {
        let resultTech = await pool.query('SELECT id_technology FROM technologies WHERE name = $1', [techName]);
        let techId;

        if (resultTech.rows.length === 0) {
          const insertTech = await pool.query(
            'INSERT INTO technologies (name, icon_url) VALUES ($1, $2) RETURNING id_technology',
            [techName, '']
          );
          techId = insertTech.rows[0].id_technology;
        } else {
          techId = resultTech.rows[0].id_technology;
        }

        await pool.query(
          'INSERT INTO project_technologies (id_project, id_technology) VALUES ($1, $2)',
          [newProject.id_project, techId]
        );
      }
    }

    await pool.query('COMMIT'); 
    res.status(201).json({ message: 'Proyecto guardado con éxito', project: newProject });
  } catch (error) {
    await pool.query('ROLLBACK'); 
    console.error('Error creando proyecto:', error);
    res.status(500).json({ error: 'Error interno guardando el proyecto' });
  }
};

// PUT

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description_es, description_en, image_url, github_url, live_url, technologies } = req.body;

  try {
    await pool.query('BEGIN');
    const resultProject = await pool.query(
      `UPDATE projects 
       SET title = $1, description_es = $2, description_en = $3, image_url = $4, github_url = $5, live_url = $6 
       WHERE id_project = $7 RETURNING *`,
      [title, description_es, description_en, image_url, github_url, live_url, id]
    );
    
    if (resultProject.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    if (technologies) {
      await pool.query('DELETE FROM project_technologies WHERE id_project = $1', [id]);
      
      if (technologies.length > 0) {
        for (const techName of technologies) {
          let resultTech = await pool.query('SELECT id_technology FROM technologies WHERE name = $1', [techName]);
          let techId;

          if (resultTech.rows.length === 0) {
            const insertTech = await pool.query(
              'INSERT INTO technologies (name, icon_url) VALUES ($1, $2) RETURNING id_technology',
              [techName, '']
            );
            techId = insertTech.rows[0].id_technology;
          } else {
            techId = resultTech.rows[0].id_technology;
          }

          await pool.query(
            'INSERT INTO project_technologies (id_project, id_technology) VALUES ($1, $2)',
            [id, techId]
          );
        }
      }
    }

    await pool.query('COMMIT'); 
    res.json({ message: 'Proyecto actualizado con éxito', project: resultProject.rows[0] });
  } catch (error) {
    await pool.query('ROLLBACK'); 
    console.error('Error actualizando proyecto:', error);
    res.status(500).json({ error: 'Error interno actualizando' });
  }
};

//DELETE

const deleteProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('BEGIN');

    await pool.query('DELETE FROM project_technologies WHERE id_project = $1', [id]);

    const result = await pool.query(
      'DELETE FROM projects WHERE id_project = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    
    await pool.query('COMMIT'); 
    res.json({ message: 'Proyecto y sus enlaces eliminados con éxito' });
  } catch (error) {
    await pool.query('ROLLBACK'); 
    console.error('Error borrando proyecto:', error);
    res.status(500).json({ error: 'Error interno borrando' });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };