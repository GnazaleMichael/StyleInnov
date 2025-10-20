import { Navigate } from "react-router-dom";
import authService from "../services/authService";

// Composant pour protéger les routes selon le rôle
function ProtectedRoute({ children, requiredRole }) {
  const currentUser = authService.getCurrentUser();

  // Si pas connecté, rediriger vers la page de connexion
  if (!currentUser) {
    return <Navigate to="/connexion" replace />;
  }

  // Si un rôle spécifique est requis et l'utilisateur ne l'a pas
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher le contenu protégé
  return children;
}

export default ProtectedRoute;


