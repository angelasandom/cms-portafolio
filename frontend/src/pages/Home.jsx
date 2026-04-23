import fotoPerfil from '../assets/angela-sanchez-perfil.webp';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home({ language }) {
  const [displayedText, setDisplayedText] = useState('');
  
  const fullText = language === 'es' 
    ? '> STATUS: INICIALIZANDO SISTEMA...\n> ANALIZANDO REQUISITOS... [OK]\n> COMPILANDO SOLUCIONES... [OK]\n> READY PARA EL SIGUIENTE RETO.' 
    : '> STATUS: INITIALIZING SYSTEM...\n> ANALYZING REQUIREMENTS... [OK]\n> COMPILING SOLUTIONS... [OK]\n> READY FOR THE NEXT CHALLENGE.';

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 35); 
    return () => clearInterval(timer);
  }, [language, fullText]);

  return (
    <main className="min-h-screen bg-[#F1f1f1] text-slate-950 font-sans overflow-hidden">
      
      {/* Retícula */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-8 flex flex-col items-start">
            
            <div className="inline-block px-4 sm:px-5 py-2 mb-8 sm:mb-10 border-4 border-slate-950 bg-white text-slate-950 text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              ANGELA SÁNCHEZ // FULL STACK BUILDER
            </div>
            
            {/* TÍTULO */}
            <h1 className="text-6xl sm:text-7xl md:text-[80px] lg:text-[110px] xl:text-[140px] font-black text-slate-950 tracking-tighter leading-[0.85] lg:leading-[0.8] mb-10 sm:mb-12 break-words w-full uppercase">
              {language === 'es' ? 'Aprender' : 'Learn'}<span className="text-indigo-600">.</span><br />
              {language === 'es' ? 'Resolver' : 'Solve'}<span className="text-pink-500">.</span><br />
              <span className="bg-slate-950 text-white px-2">{language === 'es' ? 'Crear' : 'Create'}.</span>
            </h1>

            {/* CONTENEDOR */}
            <div className="max-w-full md:max-w-2xl lg:max-w-3xl border-l-[6px] sm:border-l-8 border-slate-950 pl-6 sm:pl-8 py-2 mb-10 sm:mb-12">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                {language === 'es' 
                  ? 'Desarrollo aplicaciones Full Stack uniendo lógica y creatividad. Soluciones que funcionan tanto para el usuario como para el negocio.' 
                  : 'Developing Full Stack applications by merging logic and creativity. Solutions that work for both the user and the business.'}
              </p>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                {language === 'es' 
                  ? 'No me asustan los problemas complejos, me motivan. Disfruto dominando nuevas herramientas para programar productos digitales que sean útiles y que tengan sentido.' 
                  : "Complex problems don't scare me; they motivate me. I enjoy mastering new tools to build digital products that are useful and just make sense."}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 items-center w-full">
              <Link 
                to="/proyectos" 
                className="group w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 bg-pink-500 text-slate-950 rounded-none border-4 border-slate-950 font-black text-lg sm:text-xl tracking-tight shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 transition-all"
              >
                {language === 'es' ? 'VER PROYECTOS →' : 'VIEW PROJECTS →'}
              </Link>
              <Link 
                to="/contacto" 
                className="text-slate-950 font-black text-lg sm:text-xl border-b-4 border-slate-950 hover:text-indigo-600 hover:border-indigo-600 transition-all pb-1 mx-auto sm:mx-0"
              >
                {language === 'es' ? 'HABLEMOS' : "LET'S TALK"}
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Foto + Terminal */}
          <div className="lg:col-span-4 relative mt-20 lg:mt-0 flex justify-center lg:justify-end pb-24 lg:pb-0"> 
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px]">
              
              <div className="aspect-square bg-slate-200 overflow-hidden border-[6px] sm:border-8 border-slate-950 shadow-[10px_10px_0px_0px_rgba(99,102,241,1)] sm:shadow-[16px_16px_0px_0px_rgba(99,102,241,1)] -rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10">
                <img 
                  src={fotoPerfil} 
                  alt="Angela Sanchez" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                  fetchPriority="high"
                />
              </div>

              {/* Terminal Consola */}
              <div className="absolute -bottom-24 sm:-bottom-32 -left-6 sm:-left-20 bg-slate-950 text-green-400 p-4 sm:p-5 border-4 border-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-[10px] sm:text-[11px] w-[260px] sm:w-72 rotate-2 hover:rotate-0 transition-transform duration-300 z-30">
                <div className="flex gap-1.5 mb-2 sm:mb-2.5 pb-2 border-b-2 border-slate-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-slate-950"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-950"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-950"></div>
                </div>
                <p className="min-h-[50px] leading-relaxed tracking-wider whitespace-pre-line">
                  {displayedText}
                  <span className="animate-pulse bg-green-400 text-slate-950 ml-0.5 inline-block w-1.5 h-3 align-middle">_</span>
                </p>
              </div>

              <div className="absolute -top-6 sm:-top-10 -right-4 sm:-right-8 px-3 sm:px-4 py-1 sm:py-1.5 border-[3px] sm:border-4 border-slate-950 bg-indigo-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
                UK / SPAIN / REMOTE
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-48 py-10 sm:py-12 border-t-[6px] sm:border-t-8 border-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {[
            { 
              id: '01', 
              title: language === 'es' ? 'Aprender' : 'Learn', 
              color: '#ec4899', 
              textColor: 'text-slate-950', 
              text: language === 'es' ? 'Gran capacidad de adaptación para trabajar con nuevas herramientas y stacks tecnológicos de forma rápida y eficiente.' : 'Strong adaptability to work with new tools and tech stacks quickly and efficiently.' 
            },
            { 
              id: '02', 
              title: language === 'es' ? 'Resolver' : 'Solve', 
              color: '#4f46e5', 
              textColor: 'text-white', 
              text: language === 'es' ? 'Enfoque analítico y colaborativo para desglosar retos técnicos complejos y construir arquitecturas Full Stack robustas.' : 'Analytical and collaborative approach to break down complex technical challenges and build robust Full Stack architectures.' 
            },
            { 
              id: '03', 
              title: language === 'es' ? 'Crear' : 'Create', 
              color: '#020617', 
              textColor: 'text-white', 
              text: language === 'es' ? 'Diseño de experiencias con propósito, uniendo código limpio, conocimientos de UX y una profunda empatía por el usuario.' : 'Designing purposeful experiences, merging clean code, UX knowledge, and deep empathy for the end user.' 
            },
          ].map((item) => (
            <article key={item.id} className={`border-4 border-slate-950 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ${item.textColor}`} style={{ backgroundColor: item.color }}>
              <span className={`font-black text-4xl sm:text-5xl mb-4 sm:mb-6 block ${item.textColor}`}>{item.id}.</span>
              <h3 className={`font-black text-2xl sm:text-3xl mb-3 sm:mb-4 uppercase tracking-tighter ${item.textColor}`}>{item.title}</h3>
              <p className={`text-sm sm:text-base font-semibold leading-relaxed ${item.textColor === 'text-white' ? 'text-slate-200' : 'text-slate-800'}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      
    </main>
  );
}

export default Home;