import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin({ language }) {
  // Hook para redirigir al usuario a otras páginas
  const navigate = useNavigate();

  // ESTADOS DEL COMPONENTE (Memoria de la pantalla)
  
  const [loading, setLoading] = useState(false); // Bloquea el botón mientras guarda
  const [projects, setProjects] = useState([]);  // Guarda la lista de proyectos de la BBDD
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // Muestra avisos de éxito o error
  const [editingId, setEditingId] = useState(null); // Guarda el ID del proyecto si lo estamos editando

  // Controla lo que está escrito en los inputs del formulario en tiempo real
  const [formData, setFormData] = useState({
    title: '',
    description_es: '',
    description_en: '',
    image_url: '',
    github_url: '',
    live_url: '',
    technologies: '' 
  });

  // API (comunicación con el Backend)
  
  // Pedir todos los proyectos al servidor 
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://cms-portafolio.onrender.com/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
    }
  };

  // Hace que 'fetchProjects' se ejecute automáticamente al abrir la página
  useEffect(() => {
    fetchProjects();
  }, []);

  // Borrar la llave del usuario y mandarlo a la pantalla de login
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // Actualizar el estado 'formData' cada vez que el usuario teclea algo en un input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Preparar el formulario para editar un proyecto existente
  const handleEdit = (project) => {
    setEditingId(project.id_project);
    
    // Convertir el array de tecnologies en un texto separado por comas en el input
    const techString = project.technologies && project.technologies.length > 0 
      ? project.technologies.map(t => t.name).join(', ') 
      : '';

    // Rellenar el formulario con los datos del proyecto seleccionado
    setFormData({
      title: project.title || '',
      description_es: project.description_es || '',
      description_en: project.description_en || '',
      image_url: project.image_url || '',
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      technologies: techString
    });

    // Subir la pantalla hacia arriba 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Limpiar el formulario y salir del modo "Edición"
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description_es: '', description_en: '', image_url: '', github_url: '', live_url: '', technologies: '' });
  };

  // Enviar los datos del formulario al backend (POST o PUT)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue al darle al botón submit
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      // Sacar token
      const token = localStorage.getItem('adminToken');
      
      // Convertir el texto de tecnologías de vuelta a un array 
      const techsArray = formData.technologies
        ? formData.technologies.split(',').map(tech => tech.trim()).filter(t => t !== '')
        : [];

      // Preparar el paquete de datos final 
      const payload = { ...formData, technologies: techsArray };

      if (editingId) {
        // Si tenemos ID hacer PUT
        await axios.put(`https://cms-portafolio.onrender.com/api/projects/${editingId}`, payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMensaje({ texto: 'PROYECTO ACTUALIZADO', tipo: 'exito' });
      } else {
        // Sino tenemos ID hacer POST 
        await axios.post('https://cms-portafolio.onrender.com/api/projects', payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMensaje({ texto: 'PROYECTO CREADO', tipo: 'exito' });
      }
      // Limpiar el formulario
      handleCancelEdit(); 
      fetchProjects();    // Descargar la lista ya actualizada
    } catch (error) {
      setMensaje({ texto: 'ERROR EN LA OPERACIÓN', tipo: 'error' });
    } finally {
      setLoading(false); 
    }
  };

  // Borrar un proyecto
  const handleDelete = async (id) => {
    // Pedir confirmación antes de borrar
    if (!window.confirm(language === 'es' ? '¿Borrar proyecto?' : 'Delete project?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      // Hacer  DELETE pasándole el ID en la URL
      await axios.delete(`https://cms-portafolio.onrender.com/api/projects/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMensaje({ texto: 'PROYECTO ELIMINADO', tipo: 'exito' });
      fetchProjects(); // Recargar la lista
    } catch (error) {
      setMensaje({ texto: 'ERROR AL ELIMINAR', tipo: 'error' });
    }
  };

  return (
    <main className="min-h-screen bg-[#F1f1f1] p-4 sm:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* CABECERA */}
        <header className="flex justify-between items-center border-b-8 border-slate-950 pb-6 mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">ADMIN_CMS</h1>
          <button onClick={handleLogout} className="bg-white border-4 border-slate-950 px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 transition-all">
            {language === 'es' ? 'SALIR' : 'LOGOUT'}
          </button>
        </header>

        {/* CAJA DE MENSAJES */}
        {mensaje.texto && (
          <div className={`p-4 mb-6 border-4 border-slate-950 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${mensaje.tipo === 'exito' ? 'bg-indigo-400' : 'bg-red-500 text-white'}`}>
            {mensaje.texto}
          </div>
        )}

        {/* FORMULARIO */}
        <section className={`bg-white border-8 border-slate-950 p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16 ${editingId ? 'bg-yellow-50' : 'bg-white'}`}>
          <h2 className="text-2xl font-black uppercase mb-6 underline decoration-pink-500 decoration-8">
            {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             {/* Título */}
             <div className="flex flex-col">
                <label className="text-xs font-black uppercase mb-1">Título del Proyecto</label>
                <input name="title" value={formData.title} onChange={handleChange} required className="p-3 border-4 border-slate-950 font-bold outline-none" placeholder="Ej: Artist Website" />
             </div>

             {/* Descripciones */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-black uppercase mb-1">Descripción (ES)</label>
                  <textarea name="description_es" value={formData.description_es} onChange={handleChange} required className="p-3 border-4 border-slate-950 font-bold h-28 resize-none outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-black uppercase mb-1">Description (EN)</label>
                  <textarea name="description_en" value={formData.description_en} onChange={handleChange} required className="p-3 border-4 border-slate-950 font-bold h-28 resize-none outline-none" />
                </div>
             </div>

             {/* URLS */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-black uppercase mb-1">URL Imagen</label>
                  <input name="image_url" value={formData.image_url} onChange={handleChange} required className="p-3 border-4 border-slate-950 font-bold outline-none" placeholder="https://..." />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-black uppercase mb-1">GitHub URL</label>
                  <input name="github_url" value={formData.github_url} onChange={handleChange} className="p-3 border-4 border-slate-950 font-bold outline-none" placeholder="https://..." />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-black uppercase mb-1">Live URL</label>
                  <input name="live_url" value={formData.live_url} onChange={handleChange} className="p-3 border-4 border-slate-950 font-bold outline-none" placeholder="https://..." />
                </div>
             </div>

             {/* Tecnologías */}
             <div className="flex flex-col">
                <label className="text-xs font-black uppercase mb-1">Tecnologías (Separadas por comas)</label>
                <input name="technologies" value={formData.technologies} onChange={handleChange} className="p-3 border-4 border-slate-950 font-bold bg-indigo-50 outline-none" placeholder="React, Node.js, Supabase..." />
             </div>
             
             {/* Botones */}
             <div className="flex gap-4 mt-2">
               {/* Botón guardar */}
               <button type="submit" disabled={loading} className={`flex-1 p-4 border-4 border-slate-950 font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${editingId ? 'bg-yellow-400' : 'bg-pink-500'}`}>
                  {loading ? 'GUARDANDO...' : (editingId ? 'ACTUALIZAR' : 'PUBLICAR')}
               </button>
               {/* Botón cancelar */}
               {editingId && (
                 <button type="button" onClick={handleCancelEdit} className="bg-slate-200 px-8 border-4 border-slate-950 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   CANCELAR
                 </button>
               )}
             </div>
          </form>
        </section>

        {/* LISTADO DE PROYECTOS */}
        <section>
          <h2 className="text-3xl font-black uppercase mb-8">Proyectos en BBDD</h2>
          <div className="grid gap-4">
            {/* Recorre el array de proyectos e imprime una tarjeta por cada uno */}
            {projects.map(project => (
              <div key={project.id_project} className="bg-white border-4 border-slate-950 p-4 flex justify-between items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4">
                  {/* Foto en miniatura. Oculta en móviles pequeños */}
                  <img src={project.image_url} alt="" className="w-12 h-12 border-2 border-slate-950 object-cover hidden sm:block" />
                  <h3 className="font-black uppercase">{project.title}</h3>
                </div>
                {/* Botones */}
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="bg-yellow-400 border-2 border-slate-950 p-2 font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">EDIT</button>
                  <button onClick={() => handleDelete(project.id_project)} className="bg-red-500 text-white border-2 border-slate-950 p-2 font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">DEL</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Admin;