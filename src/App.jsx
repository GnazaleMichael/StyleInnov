import Boutton from "./composant/JSX/boutton";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Accueil from './pages/JSX/accueil.jsx'
import Catalogue from './pages/JSX/catalogue.jsx'
import Commande from './pages/JSX/commande.jsx'
import DetailCatalogue from './pages/JSX/detailsCatalogues.jsx'
import Panier from './pages/JSX/panier.jsx'
import Demande from "./pages/JSX/demande.jsx";
import Contact from "./pages/JSX/contact.jsx";

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
        </Routes>
      
    </div>
    
  );
}

export default App;
