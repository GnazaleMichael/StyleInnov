import "../CSS/boutton.css";

function Boutton( {text, color, onClick, icon, largeur, className, backgroundColor} ) {
  return (
    
      <button 
        type="button" 
        className={`btn ${color} ${className}`} 
        style={{ 
          width: largeur,
          backgroundColor: backgroundColor,
          color: color // Couleur du texte personnalisée
        }}
        onClick={onClick}
      >
        {icon && <span className="icon">{icon}</span>}
        {text}
      </button>
    
  )
}

export default Boutton;