import "../CSS/Navbar.css";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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

          {/* Liens + Actions */}
          <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
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
              contact
            </NavLink>

            {/* Actions dans le menu mobile */}
            <NavLink
              id="boxBoutton"
              to="/panier"
              onClick={closeMenu}
            >
              <button className="icon-button">
                <ShoppingBag className="icon" />
                <span className="connexion-text">Panier</span>
              </button>
            </NavLink>

            <button className="icon-button connexion-button">
              <User className="icon" />
              <span className="connexion-text">Connexion</span>
            </button>
          </div>

          {/* Actions Desktop */}
          

            
        </div>
      </div>
    </nav>
  );
}