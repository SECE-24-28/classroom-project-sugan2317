import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserProtectedRoute({ children }) {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated || userRole !== 'user') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default UserProtectedRoute;