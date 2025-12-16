function SkeletonCard({ type = 'default' }) {
  if (type === 'plan') {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--border-radius)',
        padding: '25px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div className="skeleton-dark" style={{ height: '24px', marginBottom: '15px' }} />
        <div className="skeleton-dark" style={{ height: '32px', width: '60%', margin: '0 auto 20px' }} />
        
        <div style={{ marginBottom: '20px' }}>
          <div className="skeleton-dark" style={{ height: '16px', marginBottom: '8px' }} />
          <div className="skeleton-dark" style={{ height: '16px', marginBottom: '8px' }} />
          <div className="skeleton-dark" style={{ height: '16px', marginBottom: '8px' }} />
          <div className="skeleton-dark" style={{ height: '16px' }} />
        </div>
        
        <div className="skeleton-dark" style={{ height: '40px', borderRadius: '10px' }} />
      </div>
    );
  }

  if (type === 'stat') {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--border-radius)',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div className="skeleton-dark" style={{ height: '20px', marginBottom: '10px' }} />
        <div className="skeleton-dark" style={{ height: '32px', width: '70%', margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 'var(--border-radius)',
      padding: '20px'
    }}>
      <div className="skeleton-dark" style={{ height: '20px', marginBottom: '15px' }} />
      <div className="skeleton-dark" style={{ height: '16px', marginBottom: '10px' }} />
      <div className="skeleton-dark" style={{ height: '16px', width: '80%' }} />
    </div>
  );
}

export default SkeletonCard;