import React from "react";
import CartPanier from "../../composant/JSX/cart-panier";
import "../CSS/panier.css";
import Boutton from "../../composant/JSX/boutton";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import { LuArrowLeft } from "react-icons/lu";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Panier() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  // Calcul du sous-total
  const subtotal = getTotal();

  const handleIncrement = (cartItemId) => {
    incrementQuantity(cartItemId);
  };

  const handleDecrement = (cartItemId) => {
    decrementQuantity(cartItemId);
  };

  const handleRemove = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/commande');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="panier-container">
        <div className="cart-section">
          <h2>Panier ({cart.length})</h2>
          <a href="/catalogue">
            <Boutton
              text="retour au catalogue"
              color={"black"}
              largeur={"200px"}
              icon={<LuArrowLeft />}
            >
              {" "}
            </Boutton>
          </a>
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              color: '#666' 
            }}>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                Votre panier est vide
              </p>
              <a href="/catalogue">
                <Boutton
                  text="Voir nos produits"
                  backgroundColor="#000"
                  color="white"
                  largeur="200px"
                />
              </a>
            </div>
          ) : (
            cart.map((item) => (
              <CartPanier
                key={item.cartItemId}
                item={item}
                onIncrement={() => handleIncrement(item.cartItemId)}
                onDecrement={() => handleDecrement(item.cartItemId)}
                onRemove={() => handleRemove(item.cartItemId)}
              />
            ))
          )}
        </div>

        <div className="resume-section">
          <h3>RÉSUMÉ DU PANIER</h3>
          <p>
            Sous-total: <strong>{subtotal.toLocaleString()} FCFA</strong>
          </p>
          <div onClick={handleCheckout}>
            <Boutton
              text="Commander"
              color="white"
              backgroundColor={cart.length === 0 ? "#ccc" : "black"}
              largeur={"100%"}
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Panier;
