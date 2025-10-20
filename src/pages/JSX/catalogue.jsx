import React, { useEffect, useState } from "react";
import "../CSS/catalogue.css";
import Navbar from "../../composant/JSX/Navbar";
import Boutton from "../../composant/JSX/boutton";
import Footer from "../../composant/JSX/footer";
import CartProduit from "../../composant/JSX/cart-produit";
import { LuFilter, LuUpload, LuSearch } from "react-icons/lu";

function Catalogue() {
  const [produits, setProduits] = useState([]);
  const [filters, setFilters] = useState({
    recherche: "",
    categorie: "all",
    prix: "all",
    couleurs: "all",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    fetch("/data/produits.json")
      .then((res) => res.json())
      .then((data) => setProduits(data))
      .catch((err) => console.error("Erreur chargement JSON :", err));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="catalogue-main">
        <div className="division">
          {/* ==== SECTION FILTRES ==== */}
          <section className="filtre-section">
            {" "}
            {/* Titre avec icône */}{" "}
            <div className="filtre-header">
              {" "}
              <LuFilter className="header-icon" />{" "}
              <h3 className="header-title">Filtres</h3>{" "}
            </div>{" "}
            {/* Container des filtres */}{" "}
            <div className="filtres-container">
              {" "}
              {/* Recherche */}{" "}
              <div className="filter-group">
                {" "}
                <label htmlFor="recherche" className="filter-label">
                  {" "}
                  Recherche{" "}
                </label>{" "}
                <div className="input-wrapper">
                  {""}
                  <LuSearch className="input-icon" />{}
                  <input
                    type="text"
                    id="recherche"
                    className="filter-input"
                    placeholder="Nom ou description..."
                    value={filters.recherche}
                    onChange={handleChange}
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* Catégorie */}{" "}
              <div className="filter-group">
                {" "}
                <label htmlFor="categorie" className="filter-label">
                  {" "}
                  Catégorie{" "}
                </label>{" "}
                <div className="select-wrapper">
                  {" "}
                  <select
                    id="categorie"
                    className="filter-select"
                    value={filters.categorie}
                    onChange={handleChange}
                  >
                    {" "}
                    <option value="all">Toutes les catégories</option>{" "}
                    <option value="vetements">Vêtements</option>{" "}
                    <option value="accessoires">Accessoires</option>{" "}
                    <option value="chaussures">Chaussures</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Prix */}{" "}
              <div className="filter-group">
                {" "}
                <label htmlFor="prix" className="filter-label">
                  {" "}
                  Prix{" "}
                </label>{" "}
                <div className="select-wrapper">
                  {" "}
                  <select
                    id="prix"
                    className="filter-select"
                    value={filters.prix}
                    onChange={handleChange}
                  >
                    {" "}
                    <option value="all">Tous les prix</option>{" "}
                    <option value="0-50">0€ - 50€</option>{" "}
                    <option value="50-100">50€ - 100€</option>{" "}
                    <option value="100-200">100€ - 200€</option>{" "}
                    <option value="200+">200€+</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Couleurs */}{" "}
              <div className="filter-group">
                {" "}
                <label htmlFor="couleurs" className="filter-label">
                  {" "}
                  Couleurs{" "}
                </label>{" "}
                <div className="select-wrapper">
                  {" "}
                  <select
                    id="couleurs"
                    className="filter-select"
                    value={filters.couleurs}
                    onChange={handleChange}
                  >
                    {" "}
                    <option value="all">Toutes les couleurs</option>{" "}
                    <option value="noir">Noir</option>{" "}
                    <option value="blanc">Blanc</option>{" "}
                    <option value="rouge">Rouge</option>{" "}
                    <option value="bleu">Bleu</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Tailles */}{" "}
              <div className="filter-group">
                {" "}
                <label htmlFor="tailles" className="filter-label">
                  {" "}
                  Tailles{" "}
                </label>{" "}
                <div className="select-wrapper">
                  {" "}
                  <select id="tailles" className="filter-select">
                    {" "}
                    <option value="all">Toutes les tailles</option>{" "}
                    <option value="xs">XS</option> <option value="s">S</option>{" "}
                    <option value="m">M</option> <option value="l">L</option>{" "}
                    <option value="xl">XL</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Séparateur */} <div className="filter-divider"></div>{" "}
              {/* Bouton Importer */}{" "}
              <a href="/demande">
                <Boutton
                text="Importer un modèle"
                color="Black"
                backgroundColor="White"
                icon={<LuUpload />}
                largeur="100%"
              />
              </a>
              {" "}
            </div>{" "}
          </section>

          {/* ==== SECTION PRODUITS ==== */}
          <section className="produits-section">
            <div className="produits-header">
              <h2 className="produits-title">Catalogue de Produits</h2>
              <p>Tenues trouvées pour vous</p>
            </div>

            <div className="produits-list">
              {produits.length === 0 ? (
                <p>Chargement des produits...</p>
              ) : (
                produits.map((item) => (
                  <CartProduit
                    id={item.id}
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    price={item.price}
                    rating={item.rating}
                    delay={item.delay}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalogue;
