import "../CSS/cartAvance.css";
import Boutton from "../../composant/JSX/boutton";
import { LuMessageCircle, LuFileText } from "react-icons/lu";
import React from "react";

function CartAvance({
  titre = "Produit sans titre",
  prix = "Non défini",
  photoprofile = "/images/default-profile.jpg",
  date = "Date inconnue",
  status = "Inconnu",
  quantite = 0,
  progress = 0,
}) {
  const safeStatus =
    typeof status === "string" ? status.toLowerCase() : "inconnu";

  const getProgressColor = () => {
    switch (safeStatus) {
      case "en cours":
        return "#fbbf24"; // jaune
      case "expédié":
        return "#3b82f6"; // bleu
      case "livré":
        return "#22c55e"; // vert
      case "annulé":
        return "#ef4444"; // rouge
      default:
        return "#9ca3af"; // gris
    }
  };

  return (
    <div className="cart-avance-content">
      <div className="titre">
        <h3>{titre}</h3>
        <p className="prix">{prix} FCFA</p>
      </div>

      <div className="descrp">
        <h4>
          Passée le {date} — <span>{quantite} article(s)</span>
        </h4>
        <div className={`status ${safeStatus}`}>{status}</div>
      </div>

      <div className="barreProgression">
        <div
          className="progress-inner"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(),
          }}
        ></div>
      </div>

      <div className="photoProfile">
        <img src={photoprofile} alt="photo de profil" />
        <div className="boutton-group">
          <a href="/contact">
            <Boutton
              text="Contact"
              icon={<LuMessageCircle />}
              color="white"
              backgroundColor="black"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartAvance;
