import { Routes, Route } from "react-router-dom";
import Accueil from './pages/JSX/accueil.jsx'
import Catalogue from './pages/JSX/catalogue.jsx'
import Commande from './pages/JSX/commande.jsx'
import DetailCatalogue from './pages/JSX/detailsCatalogues.jsx'
import Panier from './pages/JSX/panier.jsx'
import Demande from "./pages/JSX/demande.jsx";
import Contact from "./pages/JSX/contact.jsx";
import Inscription from "./pages/JSX/inscription.jsx";
import Connexion from "./pages/JSX/connexion.jsx";
import Dashboard from "./pages/JSX/dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
  
    <div className="App">
      
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/produits/:id" element={<DetailCatalogue />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/demande" element={<Demande />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      
    </div>
    
  );
}

export default App;
