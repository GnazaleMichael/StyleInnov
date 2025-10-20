import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLayout.css";
import { 
  LuLayoutDashboard, 
  LuUsers, 
  LuShoppingBag, 
  LuPackage,
  LuSettings,
  LuLogOut,
  LuMenu,
  LuX,
  LuHouse
} from "react-icons/lu";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-circle-admin">
              <div className="palette-circle-admin">
                <div className="paint-dot-admin"></div>
                <div className="paint-dot-admin"></div>
                <div className="paint-dot-admin"></div>
              </div>
            </div>
            {sidebarOpen && <span className="logo-text-admin">StyleInnov</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LuLayoutDashboard className="sidebar-icon" />
            {sidebarOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink 
            to="/" 
            className="sidebar-link"
          >
            <LuHouse className="sidebar-icon" />
            {sidebarOpen && <span>Retour au site</span>}
          </NavLink>

          <div className="sidebar-divider"></div>

          <NavLink 
            to="/dashboard/users" 
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LuUsers className="sidebar-icon" />
            {sidebarOpen && <span>Utilisateurs</span>}
          </NavLink>

          <NavLink 
            to="/commande" 
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LuShoppingBag className="sidebar-icon" />
            {sidebarOpen && <span>Commandes</span>}
          </NavLink>

          <NavLink 
            to="/catalogue" 
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LuPackage className="sidebar-icon" />
            {sidebarOpen && <span>Produits</span>}
          </NavLink>

          <div className="sidebar-divider"></div>

          <button className="sidebar-link" style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>
            <LuSettings className="sidebar-icon" />
            {sidebarOpen && <span>Paramètres</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          {currentUser && (
            <div className="user-profile">
              <div className="user-avatar">
                {currentUser.prenom.charAt(0)}{currentUser.nom.charAt(0)}
              </div>
              {sidebarOpen && (
                <div className="user-info">
                  <p className="user-name-sidebar">{currentUser.prenom} {currentUser.nom}</p>
                  <p className="user-role">{currentUser.role}</p>
                </div>
              )}
            </div>
          )}
          <button className="logout-btn-sidebar" onClick={handleLogout}>
            <LuLogOut className="sidebar-icon" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <LuX size={20} /> : <LuMenu size={20} />}
      </button>

      {/* Main content */}
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

