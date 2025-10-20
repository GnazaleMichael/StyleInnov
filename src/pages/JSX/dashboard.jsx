import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/dashboard.css";
import Navbar from "../../composant/JSX/Navbar";
import Footer from "../../composant/JSX/footer";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import { 
  LuUsers, 
  LuShoppingBag, 
  LuTrendingUp, 
  LuDollarSign,
  LuTrash2,
  LuPenLine,
  LuSearch,
  LuMail,
  LuMailOpen,
  LuClock,
  LuCircleCheck
} from "react-icons/lu";

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Vérifier si l'utilisateur est admin
    if (!currentUser || currentUser.role !== 'admin') {
      navigate("/");
      return;
    }

    // Charger les utilisateurs
    const allUsers = authService.getUsers();
    setUsers(allUsers);

    // Charger les commandes
    fetch('/data/cartdetail.json')
      .then(res => res.json())
      .then(data => setCommandes(data))
      .catch(err => console.error('Erreur chargement commandes:', err));

    // Charger les messages
    fetch('/data/messages.json')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Erreur chargement messages:', err));
  }, [navigate]);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const updatedUsers = users.filter(u => u.id !== userId);
      authService.saveUsers(updatedUsers);
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, lu: true } : msg
    ));
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      setMessages(messages.filter(msg => msg.id !== messageId));
    }
  };

  // Statistiques
  const totalUsers = users.length;
  const totalCommandes = commandes.length;
  const totalRevenu = commandes.reduce((sum, cmd) => sum + cmd.prix, 0);
  const commandesEnCours = commandes.filter(cmd => cmd.status === "En cours").length;
  const messagesNonLus = messages.filter(msg => !msg.lu).length;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard Administrateur</h1>
          <p>Bienvenue {currentUser?.prenom} {currentUser?.nom}</p>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#dbeafe" }}>
              <LuUsers size={24} color="#2563eb" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Utilisateurs</p>
              <h3 className="stat-value">{totalUsers}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#dcfce7" }}>
              <LuShoppingBag size={24} color="#16a34a" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Commandes</p>
              <h3 className="stat-value">{totalCommandes}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#fef3c7" }}>
              <LuDollarSign size={24} color="#ca8a04" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Revenu Total</p>
              <h3 className="stat-value">{totalRevenu.toLocaleString()} FCFA</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#fed7aa" }}>
              <LuTrendingUp size={24} color="#ea580c" />
            </div>
            <div className="stat-content">
              <p className="stat-label">En cours</p>
              <h3 className="stat-value">{commandesEnCours}</h3>
            </div>
          </div>
        </div>

        {/* Gestion des utilisateurs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Gestion des Utilisateurs</h2>
            <div className="search-box">
              <LuSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Rôle</th>
                  <th>Inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone || '-'}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.dateInscription}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit-btn"
                          title="Modifier"
                        >
                          <LuPenLine size={16} />
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Supprimer"
                          >
                            <LuTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages des clients */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Messages des Clients</h2>
            <div className="badge-info">
              {messagesNonLus > 0 && (
                <span className="unread-badge">{messagesNonLus} non lu{messagesNonLus > 1 ? 's' : ''}</span>
              )}
            </div>
          </div>

          <div className="messages-grid">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className={`message-card ${!message.lu ? 'unread' : ''}`}>
                <div className="message-header">
                  <div className="message-sender">
                    {!message.lu ? (
                      <LuMail className="message-icon unread-icon" size={20} />
                    ) : (
                      <LuMailOpen className="message-icon read-icon" size={20} />
                    )}
                    <div>
                      <h4>{message.nom}</h4>
                      <p className="message-email">{message.email}</p>
                    </div>
                  </div>
                  <div className="message-meta">
                    <span className="message-date">
                      <LuClock size={14} />
                      {message.date} à {message.heure}
                    </span>
                  </div>
                </div>

                <div className="message-subject">
                  <strong>{message.sujet}</strong>
                  <span className={`message-status ${message.statut}`}>
                    {message.statut === 'nouveau' && 'Nouveau'}
                    {message.statut === 'en_cours' && 'En cours'}
                    {message.statut === 'resolu' && 'Résolu'}
                  </span>
                </div>

                <p className="message-content">{message.message}</p>

                <div className="message-actions">
                  {!message.lu && (
                    <button 
                      className="msg-btn mark-read-btn"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      <LuCircleCheck size={16} />
                      Marquer comme lu
                    </button>
                  )}
                  <button className="msg-btn reply-btn">
                    <LuMail size={16} />
                    Répondre
                  </button>
                  <button 
                    className="msg-btn delete-msg-btn"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <LuTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Commandes Récentes</h2>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Status</th>
                  <th>Progression</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((cmd, index) => (
                  <tr key={index}>
                    <td>{cmd.titre}</td>
                    <td>{cmd.prix.toLocaleString()} FCFA</td>
                    <td>{cmd.date}</td>
                    <td>{cmd.quantite}</td>
                    <td>
                      <span className={`status-badge ${cmd.status.toLowerCase().replace(' ', '-')}`}>
                        {cmd.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${cmd.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{cmd.progress}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;


