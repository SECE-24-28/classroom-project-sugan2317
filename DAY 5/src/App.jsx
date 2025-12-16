import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminPlans from './pages/AdminPlans';
import AdminPayments from './pages/AdminPayments';
import Fraud from './pages/Fraud';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Notifications from './pages/Notifications';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/user/dashboard" 
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/plans" 
            element={
              <UserProtectedRoute>
                <Plans />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/payment" 
            element={
              <UserProtectedRoute>
                <Payment />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/wallet" 
            element={
              <UserProtectedRoute>
                <Wallet />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/history" 
            element={
              <UserProtectedRoute>
                <History />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/notifications" 
            element={
              <UserProtectedRoute>
                <Notifications />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/plans" 
            element={
              <AdminProtectedRoute>
                <AdminPlans />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/payments" 
            element={
              <AdminProtectedRoute>
                <AdminPayments />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/fraud" 
            element={
              <AdminProtectedRoute>
                <Fraud />
              </AdminProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;