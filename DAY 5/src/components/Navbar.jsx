import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

function Navbar() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/plans', label: 'Plans' },
    { to: '/admin/payments', label: 'Payments' },
    { to: '/admin/fraud', label: 'Fraud' }
  ];

  const userLinks = [
    { to: '/user/dashboard', label: 'Dashboard' },
    { to: '/user/plans', label: 'Plans' },
    { to: '/user/wallet', label: 'Wallet' },
    { to: '/user/history', label: 'History' }
  ];

  const links = userRole === 'admin' ? adminLinks : userLinks;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white'
      }}>
        Recharge System
      </div>

      <div style={{
        display: 'flex',
        gap: '30px'
      }}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '10px',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {userRole === 'user' && <NotificationBell />}
        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(135deg, var(--pink), var(--purple))',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;