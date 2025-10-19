import "../CSS/cart.css";

function Cart({ icon: Icon, title, description, iconBgColor }) {
  return (
    <div className="service-card">
      <div className="icon-container" style={{ backgroundColor: iconBgColor }}>
        <Icon className="service-icon" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
}

export default Cart;
