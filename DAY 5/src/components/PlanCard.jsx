import { useNavigate } from 'react-router-dom';
import RippleButton from './RippleButton';

function PlanCard({ plan, isRecommended = false }) {
  const navigate = useNavigate();

  const handleRecharge = () => {
    navigate(`/user/payment?planId=${plan.id}`);
  };

  return (
    <div className="card-3d hover-lift" style={{
        background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))',
        borderRadius: 'var(--border-radius)',
        padding: '25px',
        boxShadow: 'var(--shadow)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}>
      {isRecommended && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '20px',
          background: 'var(--yellow)',
          color: 'black',
          padding: '5px 15px',
          borderRadius: '15px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          Recommended
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '5px' }}>
          {plan.name}
        </h3>
        <div style={{ color: 'var(--yellow)', fontSize: '2rem', fontWeight: 'bold' }}>
          ₹{plan.price}
        </div>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <span>Data:</span>
          <span style={{ fontWeight: 'bold' }}>{plan.data}GB</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <span>Validity:</span>
          <span style={{ fontWeight: 'bold' }}>{plan.validity} days</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <span>SMS:</span>
          <span style={{ fontWeight: 'bold' }}>{plan.sms}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <span>Calls:</span>
          <span style={{ fontWeight: 'bold' }}>{plan.calls}</span>
        </div>
      </div>

      <RippleButton
        onClick={handleRecharge}
        style={{
          width: '100%',
          padding: '12px',
          border: 'none',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--pink), var(--purple))',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: 'var(--shadow)'
        }}
      >
        Recharge Now
      </RippleButton>
    </div>
  );
}

export default PlanCard;