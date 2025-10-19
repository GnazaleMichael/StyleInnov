import "../CSS/commande.css";
import Navbar from "../../composant/JSX/Navbar";
import Boutton from "../../composant/JSX/boutton";
import Footer from "../../composant/JSX/Footer";
import CartAvance from "../../composant/JSX/cartAvance";
import React, { useEffect, useState } from "react";


function Commande() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("data/cartdetail.json") // le fichier doit être dans le dossier "public"
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        return response.json();
      })
      .then((data) => setProduits(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);
  return (
    <div>
      <Navbar />
      <main className="commande-main">
        <div className="commande-header">
          <h2>Mes commandes</h2>
        </div>
      {produits.length > 0 ? (
        produits.map((item, index) => (
          <CartAvance
            key={index}
            titre={item.titre}
            prix={item.prix}
            photoprofile={item.photoprofile}
            date={item.date}
            status={item.status}
            quantite={item.quantite}
            progress={item.progress}
          />
        ))
      ) : (
        <p>Chargement des produits...</p>
      )}
      </main>
      <Footer />
    </div>
  );
}
export default Commande;