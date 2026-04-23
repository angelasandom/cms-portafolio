import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';

function App() {
  // Estado global para el idioma (por defecto en INGLÉS)
  const [language, setLanguage] = useState('en');

  // Función para alternar el idioma
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <Router>
      {/* Contenedor principal */}
      <div className="min-h-screen flex flex-col bg-slate-50">
        
        {/* Pasar el idioma actual y la función para cambiar menú */}
        <Navbar language={language} toggleLanguage={toggleLanguage} />
        
        {/* Empujar el Footer hacia abajo */}
        <main className="flex-grow">
          <Routes>
            {/* Pasar el idioma actual a las páginas */}
            <Route path="/" element={<Home language={language} />} />
            <Route path="/proyectos" element={<Projects language={language} />} />
            <Route path="/contacto" element={<Contact language={language} />} />
            <Route path="/login" element={<Login language={language} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin language={language} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer language={language} />

      </div>
    </Router>
  );
}

export default App;