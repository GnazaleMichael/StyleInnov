import "../CSS/cart-produit.css";
import { LuStar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function CartProduit({ id, image, title, description, category, price, rating, delay }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produits/${id}`); // redirige vers la page détail avec l'id du produit
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Image */}
      <img src={image} alt={title} className="product-image" />

      {/* Contenu */}
      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>

        <div className="product-info">
          <span className="product-category">{category}</span>

          <div className="product-rating">
            <LuStar size={14} fill="#facc15" color="#facc15" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="product-footer">
          <p className="product-price">{price} FCFA</p>
          <p className="product-delay">{delay}</p>
        </div>
      </div>
    </div>
  );
}

export default CartProduit;
