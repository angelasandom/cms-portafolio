import { Link, useLocation } from 'react-router-dom';

function Navbar({ language, toggleLanguage }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-[6px] border-slate-950 transition-all duration-300">
      {/* Contenedor principal fijo a la parte superior */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* LOGO, enlaza a la Home */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)}
              className="text-xl sm:text-2xl font-black text-slate-950 tracking-tighter uppercase hover:text-indigo-600 transition-colors whitespace-nowrap"
            >
              ANGELA SANCHEZ<span className="text-pink-500">.</span>
            </Link>
          </div>

          {/* ENLACES (ocultos en mobile, visibles en tablet/desktop) */}
          <div className="hidden md:flex md:space-x-6 lg:space-x-10 items-center">
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-black uppercase tracking-widest transition-all pb-1 border-b-4 ${
                isActive('/') 
                ? 'border-slate-950 text-slate-950' 
                : 'border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-600'
              }`}
            >
              {language === 'es' ? 'INICIO' : 'HOME'}
            </Link>
            
            <Link 
              to="/proyectos" 
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-black uppercase tracking-widest transition-all pb-1 border-b-4 ${
                isActive('/proyectos') 
                ? 'border-slate-950 text-slate-950' 
                : 'border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-600'
              }`}
            >
              {language === 'es' ? 'PROYECTOS' : 'PROJECTS'}
            </Link>

            <Link 
              to="/contacto" 
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-black uppercase tracking-widest transition-all pb-1 border-b-4 ${
                isActive('/contacto') 
                ? 'border-slate-950 text-slate-950' 
                : 'border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-600'
              }`}
            >
              {language === 'es' ? 'CONTACTO' : 'CONTACT'}
            </Link>
          </div>

          {/* BOTONES */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            
            {/* CV  */}
            <div className="flex items-center gap-1.5 lg:gap-3 lg:mr-2">
              <a 
                href="https://drive.google.com/file/d/17SBZKnE_tmbXTPbNb_Y2LUrrnJeHpnSH/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-1.5 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-wider text-slate-950 bg-indigo-400 border-2 sm:border-[3px] border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap"
              >
                CV ES
              </a>
              
              <a 
                href="https://drive.google.com/file/d/1K95njWe6LOvSUhGHLhnB8_Y4tRPuIgIL/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-1.5 sm:px-2 lg:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-wider text-slate-950 bg-pink-500 border-2 sm:border-[3px] border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap"
              >
                CV EN
              </a>
            </div>

            {/* Separador */}
            <div className="h-6 sm:h-8 w-[2px] sm:w-1 bg-slate-950 mx-0.5 lg:mx-0"></div>

            {/*  Botón de idioma */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white border-2 sm:border-[3px] border-slate-950 text-slate-950 font-black text-[10px] sm:text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-950 hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Botón de Acceso Admin */}
            <Link 
              to="/login"
              onClick={() => window.scrollTo(0, 0)}
              title={language === 'es' ? 'Acceso Admin' : 'Admin Login'}
              className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-slate-950 border-2 sm:border-[3px] border-slate-950 text-white shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] lg:shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-slate-950 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;