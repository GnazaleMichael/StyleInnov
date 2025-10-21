import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import Boutton from "../../composant/JSX/boutton";
import { useCart } from "../../context/CartContext";
import "../CSS/detailCatalogue.css";
import { LuArrowLeft as Lureturn, LuStar, LuShoppingBag, LuTruck, LuShield, LuRotateCcw } from "react-icons/lu";

function DetailCatalogue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [produits, setProduit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [taille, setTaille] = useState('all');
  const [couleur, setCouleur] = useState('all');
  const [tissu, setTissu] = useState('all');

  useEffect(() => {
    fetch("/data/produits.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setProduit(found);
      })
      .catch((err) => console.error("Erreur chargement JSON :", err));
  }, [id]);

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  // Fonction pour ajouter au panier
  const handleAddToCart = () => {
    if (!produits) return;

    const success = addToCart(produits, {
      taille,
      couleur,
      tissu,
      quantity
    });

    // Réinitialiser les sélections si l'ajout a réussi
    if (success) {
      setQuantity(1);
      setTaille('all');
      setCouleur('all');
      setTissu('all');
    }
  };

  // Fonction pour commander maintenant
  const handleBuyNow = () => {
    if (!produits) return;

    const success = addToCart(produits, {
      taille,
      couleur,
      tissu,
      quantity
    });

    // Rediriger vers le panier si l'ajout a réussi
    if (success) {
      navigate('/panier');
    }
  };

  if (!produits) return <p>Chargement du produit...</p>;

  return (
    <div>
      <Navbar />
      <main className="detail-main">
        <div className="detail-wrapper">
        <div className="btn-retour">
          <a href="/catalogue">
            <Boutton
              text="Retour au catalogue"
              icon={<Lureturn />}
              largeur="200px"
              color="#000000ff"
            />
          </a>
        </div>
        <section className="detail-container">
          <div className="detail-image-container">
            <img
              src={produits.image}
              alt={produits.title}
              className="detail-image"
            />
          </div>
          <div className="detail">
            <div className="detail-info">
            <h1>{produits.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: 0 }}>
                <LuStar color="gold" fill="gold" size={18} /> 
                <strong>{produits.rating}</strong>
              </p>
              <span style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px' 
              }}>
                {produits.category}
              </span>
            </div>
            <p style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#000', 
              margin: '15px 0' 
            }}>
              {produits.price?.toLocaleString()} FCFA
            </p>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {produits.description || "Vêtement de haute qualité, confectionné avec soin pour vous offrir confort et élégance. Parfait pour toutes les occasions."}
            </p>
          </div>

          <div className="inputs">
            <label htmlFor="taille">Taille</label>
            <select 
              name="Taille" 
              id="Taille"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
            >
              <option value="all">Sélectionnez une taille</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <label htmlFor="couleur">Couleur</label>
            <select 
              name="couleur" 
              id="couleur"
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
            >
              <option value="all">Sélectionnez une couleur</option>
              <option value="blanc">Blanc</option>
              <option value="noir">Noir</option>
              <option value="bleu-ciel">Bleu ciel</option>
              <option value="gris">Gris</option>
            </select>

            <label htmlFor="tissu">Tissus</label>
            <select 
              name="tissus" 
              id="tissu"
              value={tissu}
              onChange={(e) => setTissu(e.target.value)}
            >
              <option value="all">Sélectionnez votre tissu</option>
              <option value="coton">Coton</option>
              <option value="lin">Lin</option>
              <option value="propres">J'ai mon tissu</option>
            </select>
          </div>

          <label className="quantity-label">Quantité</label>
          <div className="quantity-wrapper">
            <button
              type="button"
              onClick={decrease}
              className="quantity-button quantity-decrease"
              aria-label="Diminuer la quantité"
              disabled={quantity <= 1}
            >
              −
            </button>
            <input 
              type="number" 
              value={quantity} 
              readOnly 
              className="quantity-input"
              aria-label="Quantité"
              min="1"
            />
            <button
              type="button"
              onClick={increase}
              className="quantity-button quantity-increase"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
          <div onClick={handleAddToCart}>
            <Boutton
              text={"Ajouter au panier"}
              largeur={"100%"}
              icon={<LuShoppingBag />}
              backgroundColor={"black"}
            />
          </div>
          <div onClick={handleBuyNow}>
            <Boutton
              text="Commander maintenant"
              color={"black"}
              backgroundColor={"#eeeeeeff"}
              largeur={"100%"}
            />
          </div>
          <div className="badges-container">
      {badges.map((badge, idx) => (
        <div key={idx} className="badge-item">
          <div className="badge-icon">{badge.icon}</div>
          <div className="badge-title">{badge.title}</div>
          <div className="badge-subtitle">{badge.subtitle}</div>
        </div>
      ))}
    </div>
          </div>
          
          
        </section>
        <section className="tailles">
          <div className="tailles-container">
            <h2 className="tailles-title">Guide des tailles</h2>
            <p className="tailles-description">
              Toutes nos pièces sont disponibles en plusieurs tailles. Pour un
              ajustement parfait, nous recommandons de prendre vos mesures.
            </p>
            <table className="tailles-table">
              <thead>
                <tr>
                  <th>Taille</th>
                  <th>Tour de poitrine (cm)</th>
                  <th>Tour de taille (cm)</th>
                  <th>Tour de hanches (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size, idx) => (
                  <tr key={idx}>
                    <td>{size.tailles}</td>
                    <td>{size.poitrine}</td>
                    <td>{size.taille}</td>
                    <td>{size.hanches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

const sizes = [
  { tailles: "S", poitrine: "82-86", taille: "62-66", hanches: "88-92" },
  { tailles: "M", poitrine: "86-90", taille: "66-70", hanches: "92-96" },
  { tailles: "L", poitrine: "90-94", taille: "70-74", hanches: "96-100" },
  { tailles: "XL", poitrine: "94-98", taille: "74-78", hanches: "100-104" },
];

const badges = [
  {
    icon: <LuTruck size={32} />,
    title: 'Livraison',
    subtitle: '1-2 semaines'
  },
  {
    icon: <LuShield size={32} />,
    title: 'Garantie',
    subtitle: '2 ans'
  },
  {
    icon: <LuRotateCcw size={32} />,
    title: 'Retouches',
    subtitle: 'Incluses'
  }
];

export default DetailCatalogue;
