import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderizar el contenido protegido
  return children;
};

export default ProtectedRoute;