import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import Boutton from "../../composant/JSX/boutton";
import "../CSS/detailCatalogue.css";
import { LuArrowLeft as Lureturn, LuStar, LuShoppingBag, LuTruck, LuShield, LuRotateCcw } from "react-icons/lu";

function DetailCatalogue() {
  const { id } = useParams(); // on récupère l'ID dans l'URL
  const [produits, setProduit] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ déplacé ici avant tout return

  useEffect(() => {
    fetch("/public/data/produits.json")
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

  if (!produits) return <p>Chargement du produit...</p>; // ✅ après tous les hooks

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
            <p>
              <LuStar color="yellow" /> ({produits.rating}){" "}
              <span>{produits.category}</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              eligendi eum, cupiditate quas debitis fuga, unde earum quaerat
              suscipit vero deserunt ea ullam impedit aperiam!
            </p>
          </div>

          <div className="inputs">
            <label htmlFor="taille">Taille</label>
            <select name="Taille" id="Taille">
              <option value="all">Sélectionnez une taille</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <label htmlFor="couleur">Couleur</label>
            <select name="couleur" id="couleur">
              <option value="all">Sélectionnez une couleur</option>
              <option value="blanc">blanc</option>
              <option value="noir">noir</option>
              <option value="bleu-ciel">bleu ciel</option>
              <option value="gris">gris</option>
            </select>

            <label htmlFor="tissu">Tissus</label>
            <select name="tissus" id="tissu">
              <option value="all">Sélectionnez votre tissu</option>
              <option value="coton">coton</option>
              <option value="lin">lin</option>
              <option value="propres">J'ai mon tissu</option>
            </select>
          </div>

          <label style={styles.label}>Quantité</label>
          <div style={styles.wrapper}>
            <button
              onClick={decrease}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
              
            >
              −
            </button>
            <input type="text" value={quantity} readOnly style={styles.input} />
            <button
              onClick={increase}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#000000ff")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
              
            >
              +
            </button>
          </div>
          <Boutton
            text={"Ajouter au panier"}
            largeur={"100%"}
            icon={<LuShoppingBag />}
            backgroundColor={"black"}
          ></Boutton>
          <Boutton
            text="Commander maintenant"
            color={"black"}
            backgroundColor={"#eeeeeeff"}
            largeur={"100%"}
          ></Boutton>
          <div style={style.container}>
      {badges.map((badge, idx) => (
        <div key={idx} style={style.badge}>
          <div style={style.icon}>{badge.icon}</div>
          <div style={style.title}>{badge.title}</div>
          <div style={style.subtitle}>{badge.subtitle}</div>
        </div>
      ))}
    </div>
          </div>
          
          
        </section>
        <section className="tailles">
          <div style={styles.container}>
            <h2 style={styles.title}>Guide des tailles</h2>
            <p style={styles.description}>
              Toutes nos pièces sont disponibles en plusieurs tailles. Pour un
              ajustement parfait, nous recommandons de prendre vos mesures.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Taille</th>
                  <th style={styles.th}>Tour de poitrine (cm)</th>
                  <th style={styles.th}>Tour de taille (cm)</th>
                  <th style={styles.th}>Tour de hanches (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size, idx) => (
                  <tr key={idx}>
                    <td style={{ ...styles.td, ...styles.tdLabel }}>
                      {size.tailles}
                    </td>
                    <td style={styles.td}>{size.poitrine}</td>
                    <td style={styles.td}>{size.taille}</td>
                    <td style={styles.td}>{size.hanches}</td>
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

const styles = {
  label: { display: "block", marginTop: "1rem", fontWeight: "bold" },
  wrapper: { display: "flex", alignItems: "center", gap: "10px" },
  button: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  input: {
    width: "40px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "30px",
  },
};

const sizes = [
  { tailles: "S", poitrine: "82-86", taille: "62-66", hanches: "88-92" },
  { tailles: "M", poitrine: "86-90", taille: "66-70", hanches: "92-96" },
  { tailles: "L", poitrine: "90-94", taille: "70-74", hanches: "96-100" },
  { tailles: "XL", poitrine: "94-98", taille: "74-78", hanches: "100-104" },
];
const style = {
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '40px',
      padding: '40px 20px',
      backgroundColor: '#f9f9f9',
      marginTop: '60px',
      borderRadius: '8px'
    },
    badge: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      textAlign: 'center'
    },
    icon: {
      color: '#000',
      strokeWidth: 1.5
    },
    title: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#000'
    },
    subtitle: {
      fontSize: '12px',
      color: '#666'
    }
  };
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
