import { useState, useEffect } from 'react';

function PlanModal({ plan, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    data: '',
    validity: '',
    sms: '',
    calls: '',
    active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        price: plan.price || '',
        data: plan.data || '',
        validity: plan.validity || '',
        sms: plan.sms || '',
        calls: plan.calls || '',
        active: plan.active !== undefined ? plan.active : true
      });
    }
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving plan:', error);
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
          {plan ? 'Edit Plan' : 'Add New Plan'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Plan Name"
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
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
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
              name="data"
              placeholder="Data (GB)"
              value={formData.data}
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
              type="number"
              name="validity"
              placeholder="Validity (days)"
              value={formData.validity}
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
              name="sms"
              placeholder="SMS (e.g., 100/day)"
              value={formData.sms}
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
              name="calls"
              placeholder="Calls (e.g., Unlimited)"
              value={formData.calls}
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
            <label style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
              />
              Active Plan
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

export default PlanModal;