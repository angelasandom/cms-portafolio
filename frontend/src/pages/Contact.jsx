import { useState } from 'react';

function Contact({ language }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Preparar el paquete de datos para Web3Forms
    const payload = {
      access_key: "011d1434-a217-4b2c-995f-b4aefccca99f",
      subject: `Nuevo mensaje de ${formData.name} desde tu Portafolio`,
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Vaciamos el formulario
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 font-sans">
      
      {/* CABECERA */}
      <div className="mb-12 sm:mb-16 flex flex-col items-start border-b-[6px] border-slate-950 pb-8">
        
        {/* Título */}
        <h1 className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-tight mb-8 relative inline-block">
          {language === 'es' ? 'HABLEMOS' : "LET'S TALK"}
          <span className="text-pink-500">.</span>
          {/* Subrayado */}
          <span className="absolute -bottom-2 left-0 w-24 sm:w-32 h-3 bg-pink-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></span>
        </h1>

        <div className="max-w-3xl border-l-[6px] sm:border-l-8 border-slate-950 pl-6 sm:pl-8 py-2">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            {language === 'es' 
              ? '¿Tienes un proyecto en mente o buscas añadir talento a tu equipo?' 
              : 'Have a project in mind or looking to add talent to your team?'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* COLUMNA IZQUIERDA INFO */}
        <div className="bg-indigo-600 text-white p-8 sm:p-12 border-[6px] sm:border-8 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl sm:text-4xl font-black mb-6 uppercase tracking-tighter">
            {language === 'es' ? 'CONTACTO' : 'INFO'}
          </h2>
          <p className="text-indigo-100 mb-12 font-bold text-lg sm:text-xl leading-relaxed">
            {language === 'es' 
              ? 'Rellena el formulario y me pondré en contacto contigo lo antes posible.' 
              : 'Fill out the form and I will get back to you as soon as possible.'}
          </p>

          <div className="space-y-12">
            
            {/* Redes */}
            <div>
              <p className="text-sm font-black text-slate-950 bg-white inline-block px-3 py-1 border-2 border-slate-950 mb-5 uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {language === 'es' ? 'Redes profesionales' : "Let's connect"}
              </p>
              <div className="flex gap-4">
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/in/TU_USUARIO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-slate-950 border-4 border-slate-950 text-white flex items-center justify-center hover:bg-pink-500 hover:text-slate-950 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/TU_USUARIO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-slate-950 border-4 border-slate-950 text-white flex items-center justify-center hover:bg-pink-500 hover:text-slate-950 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Ubicación dinámica */}
            <div className="flex items-center gap-5 pt-4">
              <div className="w-14 h-14 bg-pink-500 border-4 border-slate-950 flex items-center justify-center text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-950 uppercase tracking-widest mb-1">
                  {language === 'es' ? 'UBICACIÓN' : 'LOCATION'}
                </p>
                <p className="text-xl font-black text-white uppercase">
                  {language === 'es' ? 'UK / ESPAÑA / REMOTO' : 'UK / SPAIN / REMOTE'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* COLUMNA DERECHA FORMULARIO */}
        <div className="bg-white p-8 sm:p-12 border-[6px] sm:border-8 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Input Nombre */}
            <div>
              <label className="block text-sm font-black text-slate-950 uppercase tracking-widest mb-3">
                {language === 'es' ? 'NOMBRE' : 'NAME'}
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-5 py-4 bg-[#F1f1f1] border-4 border-slate-950 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-950 placeholder-slate-400" 
                placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} 
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-black text-slate-950 uppercase tracking-widest mb-3">
                {language === 'es' ? 'EMAIL' : 'EMAIL'}
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-5 py-4 bg-[#F1f1f1] border-4 border-slate-950 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-950 placeholder-slate-400" 
                placeholder={language === 'es' ? 'email@ejemplo.com' : 'email@example.com'}
              />
            </div>

            {/* Input Mensaje */}
            <div>
              <label className="block text-sm font-black text-slate-950 uppercase tracking-widest mb-3">
                {language === 'es' ? 'MENSAJE' : 'MESSAGE'}
              </label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="5" 
                className="w-full px-5 py-4 bg-[#F1f1f1] border-4 border-slate-950 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-950 resize-none placeholder-slate-400" 
                placeholder={language === 'es' ? '¿Cómo puedo ayudarte?' : 'How can I help you?'}
              ></textarea>
            </div>

            {/* Botón Submit*/}
            <button 
              type="submit" 
              disabled={status === 'sending'} 
              className={`w-full mt-4 py-5 border-4 border-slate-950 font-black text-xl uppercase tracking-widest transition-all duration-200 flex justify-center items-center gap-2 ${
                status === 'success' ? 'bg-[#4ade80] text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' :
                status === 'error' ? 'bg-red-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' :
                'bg-slate-950 text-white shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] active:translate-x-2 active:translate-y-2 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {status === 'idle' && (language === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE')}
              {status === 'sending' && (language === 'es' ? 'ENVIANDO...' : 'SENDING...')}
              {status === 'success' && (language === 'es' ? '¡ENVIADO!' : 'SENT!')}
              {status === 'error' && (language === 'es' ? 'ERROR' : 'ERROR')}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;