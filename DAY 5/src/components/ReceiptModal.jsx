function ReceiptModal({ payment, plan, onClose }) {
  if (!payment) return null;

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
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'white', marginBottom: '5px' }}>Payment Receipt</h2>
          <div style={{ color: 'var(--yellow)' }}>#{payment.id}</div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Plan:</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{plan?.name || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Amount:</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>₹{payment.amount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Method:</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{payment.method}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Date:</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>
              {new Date(payment.date).toLocaleDateString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status:</span>
            <span style={{ 
              color: payment.status === 'completed' ? 'var(--yellow)' : 'var(--pink)',
              fontWeight: 'bold'
            }}>
              {payment.status}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--pink), var(--purple))',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;