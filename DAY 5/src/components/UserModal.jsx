import { useState, useEffect } from 'react';

function UserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pin: '',
    operator: 'Airtel',
    walletBalance: 0,
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        pin: user.pin || '',
        operator: user.operator || 'Airtel',
        walletBalance: user.walletBalance || 0,
        isActive: user.isActive !== undefined ? user.isActive : true
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--border-radius)',
        padding: '30px',
        width: '90%',
        maxWidth: '500px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          {user ? 'Edit User' : 'Add New User'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <input
              type="password"
              name="pin"
              placeholder="PIN"
              value={formData.pin}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <select
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px'
              }}
            >
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
            <input
              type="number"
              name="walletBalance"
              placeholder="Wallet Balance"
              value={formData.walletBalance}
              onChange={handleChange}
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <label style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
              />
              Active User
            </label>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                color: 'white',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;