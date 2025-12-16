function Card({ children, gradientBorder = false, onClick, className = '' }) {
  const hoverClass = onClick ? 'hover-lift' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${hoverClass} ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--border-radius)',
        padding: '20px',
        boxShadow: 'var(--shadow)',
        border: gradientBorder ? '2px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)',
        backgroundImage: gradientBorder ? 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(135deg, var(--pink), var(--purple))' : 'none',
        backgroundOrigin: 'border-box',
        backgroundClip: gradientBorder ? 'content-box, border-box' : 'content-box',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {children}
    </div>
  );
}

export default Card;