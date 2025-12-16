import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminProtectedRoute({ children }) {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default AdminProtectedRoute;