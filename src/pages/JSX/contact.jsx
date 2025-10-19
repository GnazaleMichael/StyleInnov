import { useState } from "react";
import "../CSS/contact.css";
import Boutton from "../../composant/JSX/boutton";
import { LuArrowLeft as Lureturn } from "react-icons/lu";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.nom && formData.email && formData.sujet && formData.message) {
      console.log("Formulaire envoyé:", formData);
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          sujet: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } else {
      alert("Veuillez remplir tous les champs obligatoires");
    }
  };

  return (
    <div className="container-main">
      {/* En-tête */}
      <Navbar></Navbar>
      <div className="header">
        <h1>Contactez-Nous</h1>
        <p>
          Notre équipe est à votre écoute pour répondre à toutes vos questions
          et vous accompagner dans vos projets de couture sur-mesure.
        </p>
      </div>
      <div className="bnt-rc">
        <a href="/catalogue">
        <Boutton
          text="Retour au catalogue"
          icon={<Lureturn />}
          largeur="200px"
          color="#000000ff"
          className={"bnt-r"}
        />
      </a>
      </div>
      
      {/* Contenu principal */}
      <div className="main-content">
        <div className="grid">
          {/* Formulaire */}
          <div className="form-section">
            <div className="form-card">
              <h2>Envoyez-nous un message</h2>
              <p className="form-subtitle">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans
                les plus brefs délais
              </p>

              <div className="form-wrapper">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nom">
                      Nom complet <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      placeholder="Michael Chifeyi"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="gnazale@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Téléphone (optionnel)</label>
                  <input
                    type="tel"
                    id="telephone"
                    placeholder="+225 07 12 71 28 38"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sujet">
                    Sujet <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="sujet"
                    placeholder="Question sur une commande, demande de devis, etc."
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Décrivez votre demande en détail..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  <span>➤</span> Envoyer le message
                </button>

                {submitted && (
                  <div className="success-message">
                    ✓ Votre message a été envoyé avec succès!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Infos de contact */}
          <div className="info-section">
            {/* Adresse */}
            <div className="info-card">
              <div className="info-header">
                <span className="icon">📍</span>
                <h3>Adresse</h3>
              </div>
              <p className="info-content">
                Rue 12 <br />
                Abidjan, Cocody Palmeraie
              </p>
            </div>

            {/* Téléphone */}
            <div className="info-card">
              <div className="info-header">
                <span className="icon">☎</span>
                <h3>Téléphone</h3>
              </div>
              <p className="info-content phone-bold">+225 07 12 71 28 38</p>
              <p className="info-hours">Lun-Ven: 9h-18h</p>
            </div>

            {/* Email */}
            <div className="info-card">
              <div className="info-header">
                <span className="icon">✉</span>
                <h3>Email</h3>
              </div>
              <p className="info-content">StylInnov@gmail.com</p>
              <p className="info-content">StylInnov@gmail.com</p>
            </div>

            {/* Horaires */}
            <div className="info-card">
              <div className="info-header">
                <span className="icon">🕐</span>
                <h3>Horaires</h3>
              </div>
              <div className="info-content">
                <p>Lun-Ven: 9h-19h</p>
                <p>Sam: 10h-18h</p>
                <p>Dim: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div className="map-section">
        <div className="map-container">
          <div className="map-content">
            <div className="map-icon">📍</div>
            <h3>Notre Atelier</h3>
            <p>12 Rue de la Mode, 75001 Paris</p>
            <a href="# " rel="noopener noreferrer" className="map-btn">
              Voir sur Google Maps
            </a>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
