import "../CSS/cart-panier.css";
import Boutton from "../../composant/JSX/boutton"
import React from "react";
import { MdDeleteOutline } from "react-icons/md";



function CartPanier({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="cart-item">
      {/* Image du produit */}
      <img src={item.image} alt={item.title} className="cart-image" />

      {/* Informations du produit */}
      <div className="cart-info">
        <h3>{item.title}</h3>
        <p className="prix">{item.price.toLocaleString()} FCFA</p>

        {/* Bouton supprimer */}
        <Boutton text="Supprimer" color={"red"} backgroundColor={"white"} icon={<MdDeleteOutline/>} largeur={"100px"}></Boutton>
      </div>

      {/* Quantité */}
      <div className="cart-actions">
        <button className="plus" onClick={() => onDecrement(item.id)}>-</button>
        <span>{item.quantity || 1}</span>
        <button className="plus" onClick={() => onIncrement(item.id)}>+</button>
      </div>
    </div>
  );
}

export default CartPanier;
