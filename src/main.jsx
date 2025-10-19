import  React  from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import CartProduit from './composant/JSX/cart-produit.jsx'
import CartAvance from './composant/JSX/cartAvance.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>
  </BrowserRouter>
)
