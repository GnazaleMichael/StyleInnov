import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/inscription.css";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import { useAuth } from "../../context/AuthContext";
import { LuUser, LuMail, LuLock, LuPhone, LuArrowRight } from "react-icons/lu";

function Inscription() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs obligatoires");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }

    // Inscription
    const result = register(formData);
    
    if (result.success) {
      // Rediriger vers la page d'accueil après inscription réussie
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="inscription-page">
      <Navbar />
      <div className="inscription-container">
        <div className="inscription-card">
          <div className="inscription-header">
            <h1>Créer un compte</h1>
            <p>Rejoignez StyleInnov et profitez de vêtements sur-mesure</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="inscription-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prenom">
                  Prénom <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <LuUser className="input-icon" />
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nom">
                  Nom <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <LuUser className="input-icon" />
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <LuMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone (optionnel)</label>
              <div className="input-with-icon">
                <LuPhone className="input-icon" />
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+225 07 12 34 56 78"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  Mot de passe <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <LuLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <LuLock className="input-icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
              <LuArrowRight className="btn-icon" />
            </button>
          </form>

          <div className="inscription-footer">
            <p>Vous avez déjà un compte ? <a href="/connexion">Se connecter</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Inscription;
