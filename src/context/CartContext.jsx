import React, { createContext, useState, useEffect, useContext } from 'react';
import '../components/Notification.css';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Afficher une notification temporaire
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Ajouter un article au panier
  const addToCart = (product, options = {}) => {
    const { taille, couleur, tissu, quantity = 1 } = options;

    // Validation des options requises
    if (!taille || taille === 'all') {
      showNotification('Veuillez sélectionner une taille', 'error');
      return false;
    }

    if (!couleur || couleur === 'all') {
      showNotification('Veuillez sélectionner une couleur', 'error');
      return false;
    }

    if (!tissu || tissu === 'all') {
      showNotification('Veuillez sélectionner un tissu', 'error');
      return false;
    }

    // Créer un identifiant unique basé sur le produit et ses options
    const cartItemId = `${product.id}-${taille}-${couleur}-${tissu}`;

    // Vérifier si cet article existe déjà dans le panier
    const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingItemIndex > -1) {
      // Mettre à jour la quantité si l'article existe
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
      showNotification(`Quantité mise à jour : ${product.title}`, 'success');
    } else {
      // Ajouter un nouvel article
      const newItem = {
        cartItemId,
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
        taille,
        couleur,
        tissu,
        delay: product.delay || 'Livraison en 3-5 jours'
      };
      setCart([...cart, newItem]);
      showNotification(`${product.title} ajouté au panier`, 'success');
    }

    return true;
  };

  // Mettre à jour la quantité d'un article
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    ));
  };

  // Augmenter la quantité
  const incrementQuantity = (cartItemId) => {
    setCart(cart.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Diminuer la quantité
  const decrementQuantity = (cartItemId) => {
    setCart(cart.map(item => 
      item.cartItemId === cartItemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Supprimer un article du panier
  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
    showNotification('Article retiré du panier', 'info');
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    showNotification('Panier vidé', 'info');
  };

  // Calculer le total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtenir le nombre total d'articles
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    getTotal,
    getTotalItems,
    notification
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartContext;

