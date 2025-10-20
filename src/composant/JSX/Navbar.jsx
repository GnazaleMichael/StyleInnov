import "../CSS/Navbar.css";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const handleLoginClick = () => {
    closeMenu();
    navigate("/connexion");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-circle">
              <div className="palette-circle">
                <div className="paint-dot"></div>
                <div className="paint-dot"></div>
                <div className="paint-dot"></div>
              </div>
            </div>
            <span className="logo-text">StyleInnov</span>
          </NavLink>

          {/* Menu Hamburger */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
          </button>

          {/* Liens de navigation principaux */}
          <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
            <div className="nav-main-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Accueil
              </NavLink>
              <NavLink
                to="/catalogue"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Catalogue
              </NavLink>
              <NavLink
                to="/commande"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Mes Commandes
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* Actions à droite */}
          <div className={`navbar-actions-right ${menuOpen ? "active" : ""}`}>
            {/* Dashboard + Panier groupés */}
            <div className="actions-group">
              {currentUser && currentUser.role === 'admin' && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link dashboard-link" : "nav-link dashboard-link"
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              )}
              
              <NavLink to="/panier" onClick={closeMenu}>
                <button className="icon-button">
                  <ShoppingBag className="icon" />
                </button>
              </NavLink>
            </div>

            {/* Utilisateur + Déconnexion */}
            <div className="user-section">
              {currentUser ? (
                <>
                  <div className="user-info-desktop">
                    <User className="icon" size={18} />
                    <span className="user-name-desktop">{currentUser.prenom} {currentUser.nom}</span>
                  </div>
                  <button className="logout-btn-desktop" onClick={handleLogout}>
                    <LogOut className="icon" size={18} />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <button className="connexion-btn-desktop" onClick={handleLoginClick}>
                  <User className="icon" size={18} />
                  <span>Connexion</span>
                </button>
              )}
            </div>
          </div>

            
        </div>
      </div>
    </nav>
  );
}