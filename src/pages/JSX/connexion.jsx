import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/connexion.css";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import { useAuth } from "../../context/AuthContext";
import { LuMail, LuLock, LuArrowRight } from "react-icons/lu";

function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    // Connexion
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      // Rediriger vers la page d'accueil après connexion réussie
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="connexion-page">
      <Navbar />
      <div className="connexion-container">
        <div className="connexion-card">
          <div className="connexion-header">
            <h1>Bienvenue !</h1>
            <p>Connectez-vous pour accéder à votre compte</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="connexion-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Mot de passe</label>
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
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" className="forgot-password">Mot de passe oublié ?</a>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
              <LuArrowRight className="btn-icon" />
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-title">🔑 Comptes de démonstration :</p>
            <div className="demo-accounts">
              <div className="demo-account">
                <strong>Admin:</strong>
                <span>admin@styleinnov.com / admin123</span>
              </div>
              <div className="demo-account">
                <strong>Client:</strong>
                <span>Sedrik.say@email.com / password123</span>
              </div>
            </div>
          </div>

          <div className="connexion-footer">
            <p>Vous n'avez pas de compte ? <a href="/inscription">S'inscrire</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Connexion;

