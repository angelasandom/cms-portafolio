import { useState, useEffect } from 'react';
import axios from 'axios';

function Projects({ language }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://cms-portafolio.onrender.com/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error conectando con el backend:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 font-sans">
      
      {/* Cabecera */}
      <header className="mb-12 border-b-[6px] border-slate-950 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h1 className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-tight">
          {language === 'es' ? 'MIS ' : 'FEATURED '}
          <span className="bg-slate-950 text-white px-4 py-1 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] cursor-default select-none">
            {language === 'es' ? 'PROYECTOS.' : 'WORK.'}
          </span>
        </h1>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center py-20 border-4 border-slate-950 p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white max-w-md mx-auto">
          <p className="text-xl text-slate-950 font-black uppercase tracking-widest animate-pulse">
            {language === 'es' ? 'CARGANDO PROYECTOS_' : 'LOADING PROJECTS_'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 auto-rows-auto md:auto-rows-[340px] grid-flow-dense">
          
          {projects.map((project) => {
            let bentoClasses = "col-span-1 row-span-1";
            
            if (project.title === 'HappyPlan App') {
              bentoClasses = "md:col-span-2 md:row-span-2";
            } else if (project.title === 'Exhibition Curator') {
              bentoClasses = "md:col-span-1 md:row-span-2";
            }

            const isExpanded = expandedId === project.id_project;

            return (
              <article 
                key={project.id_project} 
                onClick={() => toggleCard(project.id_project)}
                className={`${bentoClasses} group relative bg-white md:bg-slate-200 border-[6px] sm:border-8 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:hover:translate-x-1 md:hover:translate-y-1 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col md:block h-auto md:h-full`}
              >
                
                {/* Imagen de fondo */}
                <div className="relative md:absolute inset-0 w-full h-[250px] md:h-full bg-slate-950 border-b-[6px] md:border-b-0 border-slate-950">
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className={`w-full h-full object-cover transition-all duration-500 opacity-100 grayscale-0 md:opacity-60 md:grayscale md:group-hover:scale-105 md:group-hover:opacity-100 md:group-hover:grayscale-0 ${isExpanded ? 'md:scale-110 md:opacity-15 md:grayscale' : ''}`}
                    />
                  )}
                </div>

                {/* Capa de contraste */}
                <div 
                  className={`hidden md:block absolute inset-0 transition-all duration-300 ${isExpanded ? 'bg-slate-950/95' : 'bg-slate-950/50 group-hover:bg-slate-950/10'}`} 
                />

                {/* Contenedor del texto ) */}
                <div className="relative md:absolute inset-0 p-6 sm:p-8 flex flex-col justify-start md:justify-end bg-white md:bg-transparent">
                  
                  {/* Título */}
                  <h2 className={`text-3xl sm:text-4xl font-black text-slate-950 md:text-white uppercase tracking-tighter leading-none transition-all duration-300 md:mb-0 md:group-hover:-translate-y-2 ${isExpanded ? 'md:mb-6' : ''}`}>
                    <span className={`md:text-white ${isExpanded ? 'md:bg-pink-500 md:px-2' : 'md:group-hover:bg-slate-950 md:group-hover:px-2'} transition-colors duration-300`}>
                      {project.title}
                    </span>
                  </h2>
                  
                  {/* Contenido */}
                  <div 
                    className={`flex flex-col mt-4 md:mt-0 opacity-100 translate-y-0 max-h-[1000px] md:transition-all md:duration-500 md:ease-in-out ${isExpanded ? 'md:max-h-[300px] md:opacity-100 md:translate-y-0 md:overflow-y-auto md:pr-4 md:scrollbar md:scrollbar-thumb-pink-500 md:scrollbar-track-slate-800' : 'md:max-h-0 md:opacity-0 md:translate-y-8 md:overflow-hidden'}`}
                  >
                    <p className="text-slate-700 md:text-slate-200 font-medium leading-relaxed text-sm sm:text-base mb-6">
                      {language === 'es' ? project.description_es : project.description_en}
                    </p>
                    
                    {/* Tecnologías */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech.id_technology} 
                            className="bg-[#F1f1f1] text-slate-950 border-[3px] border-slate-950 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* ENLACES */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto pb-2">
                      {project.live_url && (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} 
                          className="flex-1 text-center py-3 bg-pink-500 text-slate-950 border-[3px] border-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          {language === 'es' ? 'VER WEB' : 'LIVE SITE'}
                        </a>
                      )}
                      
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-center py-3 bg-indigo-600 text-white border-[3px] border-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          GITHUB
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </article>
            );
          })}

        </div>
      )}
    </section>
  );
}

export default Projects;