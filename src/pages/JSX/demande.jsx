import React, { useState } from "react";
import { ArrowLeft, Upload, Send } from "lucide-react";
import "../CSS/demande.css";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/Footer";
import { LuSend } from "react-icons/lu";
import Boutton from "../../composant/JSX/boutton";
import { LuArrowLeft } from "react-icons/lu";
function Demande() {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
    measurements: "",
    colors: "",
    tissues: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demande envoyée:", formData);
    alert("Demande envoyée avec succès!");
  };

  return (
    <div className="custom-order-container">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Main Content */}
      <div className="order-main-content">
        {/* Retour */}
        <div className="order-back-link">
          <a href="/catalogue">
            <Boutton
            className={"left"}
              text="retour au catalogue"
              color={"black"}
              largeur={"200px"}
              icon={<LuArrowLeft />}
            >
              {" "}
            </Boutton>
          </a>
        </div>

        {/* Header */}
        <div className="order-header">
          <h2>Créer une demande personnalisée</h2>
          <p>
            Partagez votre vision avec nos créateurs pour obtenir une création
            sur mesure
          </p>
        </div>

        {/* Form Container */}
        <div className="order-form">
          {/* Left Column - Image Upload */}
          <div className="order-form-card order-image-section">
            <h3>Photo de référence *</h3>
            <p className="form-description">
              Téléchargez une photo du modèle que vous souhaitez reproduire
            </p>

            <label className="image-upload-box">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <div className="image-upload-placeholder">
                  <Upload size={48} className="upload-icon" />
                  <p className="upload-text-main">
                    Glissez-déposez une image ou
                  </p>
                  <p className="upload-text-bold">parcourez vos fichiers</p>
                  <p className="upload-text-small">
                    PNG, JPG, JPEG jusqu'à 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden-input"
              />
            </label>
          </div>

          {/* Right Column - Form Details */}
          <div className="order-form-card order-details-section">
            <h3>Détails de la demande</h3>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Titre de la demande *</label>
              <input
                type="text"
                name="title"
                placeholder="Ex: Robe de soirée style vintage"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Catégorie *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="robe">Robe</option>
                <option value="costume">Costume</option>
                <option value="chemise">Chemise</option>
                <option value="pantalon">Pantalon</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description détaillée *</label>
              <textarea
                name="description"
                placeholder="Décrivez en détail ce que vous souhaitez : style, finitions, occasions d'usage..."
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            {/* Budget & Deadline */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Budget estimé (€)</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Ex: 500"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Délai souhaité</label>
                <input
                  type="text"
                  name="deadline"
                  placeholder="Ex: 4 semaines"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section - Full Width */}
          <div className="order-form-card order-preferences-section">
            <h3>Préférences (optionnel)</h3>

            <div className="preferences-grid">
              {/* Measurements */}
              <div className="form-group">
                <label className="form-label">Mensurations</label>
                <textarea
                  name="measurements"
                  placeholder="Ex: Tour de poitrine: 90cm, Tour de taille: 70cm..."
                  value={formData.measurements}
                  onChange={handleChange}
                  className="form-textarea preferences-textarea"
                />
              </div>

              {/* Colors */}
              <div className="form-group">
                <label className="form-label">Couleurs préférées</label>
                <input
                  type="text"
                  name="colors"
                  placeholder="Ex: Noir, Bordeaux, Bleu marine"
                  value={formData.colors}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Tissues */}
              <div className="form-group">
                <label className="form-label">Tissus préférés</label>
                <input
                  type="text"
                  name="tissues"
                  placeholder="Ex: Soie, Coton, Lin"
                  value={formData.tissues}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Next Steps Section - Full Width */}
          <div className="order-form-card order-steps-section">
            <h3>Prochaines étapes</h3>

            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <p>Votre demande sera étudiée par notre équipe d'experts</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <p>Nous vous enverrons un devis détaillé sous 24h</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <p>
                  Après validation, nous lançons la confection de votre pièce
                </p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <p>Vous recevez votre création unique selon le délai convenu</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Boutton
            onClick={handleSubmit}
            className="order-submit-btn"
            text="envoyer"
            icon={<LuSend />}
            largeur={"100%"}
          ></Boutton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Demande;
