import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ language }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://cms-portafolio.onrender.com/api/login', {
        email,
        password
      });

      // Guardar el token de seguridad en el navegador
      localStorage.setItem('adminToken', response.data.token);
      
      // Redirigir al panel de admin 
      navigate('/admin'); 

    } catch (err) {
      // Mostrar error
      setError(
        err.response?.data?.error || 
        (language === 'es' ? 'Error al conectar con el servidor.' : 'Server connection error.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F1f1f1] font-sans flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Retícula */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Tarjeta de Login*/}
      <div className="bg-white border-[6px] sm:border-8 border-slate-950 p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative z-10">
        
        {/* Badge superior */}
        <div className="absolute -top-6 -left-2 sm:-left-6 px-4 py-1.5 border-4 border-slate-950 bg-indigo-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
          {language === 'es' ? 'ACCESO RESTRINGIDO' : 'RESTRICTED ACCESS'}
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tighter uppercase mb-2 mt-4">
          {language === 'es' ? 'INTRANET' : 'SYSTEM'}
        </h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-8 border-b-4 border-slate-950 pb-4">
          {language === 'es' ? 'Identificación requerida' : 'Identification required'}
        </p>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500 text-slate-950 font-black border-4 border-slate-950 p-3 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-xs tracking-wider animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Input Email */}
          <div>
            <label className="block text-sm font-black text-slate-950 uppercase tracking-widest mb-2">
              ADMIN EMAIL
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-5 py-4 bg-[#F1f1f1] border-4 border-slate-950 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-950 placeholder-slate-400" 
              placeholder="ADMIN@DOMAIN.COM" 
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-black text-slate-950 uppercase tracking-widest mb-2">
              {language === 'es' ? 'CONTRASEÑA' : 'PASSWORD'}
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-5 py-4 bg-[#F1f1f1] border-4 border-slate-950 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-950 placeholder-slate-400" 
              placeholder="••••••••" 
            />
          </div>

          {/* Botón Submit */}
          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full mt-4 py-5 border-4 border-slate-950 font-black text-xl uppercase tracking-widest transition-all duration-200 flex justify-center items-center gap-2 ${
              loading 
              ? 'bg-slate-400 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed' 
              : 'bg-slate-950 text-white shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] active:translate-x-2 active:translate-y-2 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {loading 
              ? (language === 'es' ? 'VERIFICANDO_' : 'VERIFYING_') 
              : (language === 'es' ? 'ENTRAR AL SISTEMA' : 'ENTER SYSTEM')}
          </button>
        </form>

      </div>
    </main>
  );
}

export default Login;