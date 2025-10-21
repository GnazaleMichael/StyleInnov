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
        
        {/* Options du produit */}
        {(item.taille || item.couleur || item.tissu) && (
          <div className="cart-options">
            {item.taille && item.taille !== 'all' && (
              <span className="option-badge">Taille: {item.taille}</span>
            )}
            {item.couleur && item.couleur !== 'all' && (
              <span className="option-badge">Couleur: {item.couleur}</span>
            )}
            {item.tissu && item.tissu !== 'all' && (
              <span className="option-badge">Tissu: {item.tissu}</span>
            )}
          </div>
        )}

        {/* Bouton supprimer */}
        <div onClick={onRemove}>
          <Boutton 
            text="Supprimer" 
            color={"red"} 
            backgroundColor={"white"} 
            icon={<MdDeleteOutline/>} 
            largeur={"100px"}
          />
        </div>
      </div>

      {/* Quantité */}
      <div className="cart-actions">
        <button className="plus" onClick={onDecrement}>-</button>
        <span>{item.quantity || 1}</span>
        <button className="plus" onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default CartPanier;
