import React, { useState, useEffect } from "react";
import CartPanier from "../../composant/JSX/cart-panier";
import "../CSS/panier.css";
import Boutton from "../../composant/JSX/boutton";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/Footer";
import { LuArrowLeft } from "react-icons/lu";
function Panier() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Exemple: charger les données du panier
    fetch("/data/panier.json")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  // 🔹 Calcul du sous-total sans NaN
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const handleIncrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
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
          {cart.map((item) => (
            <CartPanier
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="resume-section">
          <h3>RÉSUMÉ DU PANIER</h3>
          <p>
            Sous-total: <strong>{subtotal.toLocaleString()} FCFA</strong>
          </p>
          <Boutton
            text="commander"
            color="white"
            backgroundColor={"black"}
            largeur={"100%"}
          ></Boutton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Panier;
