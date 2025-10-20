// Service d'authentification
const AUTH_KEY = 'styleinnov_user';
const USERS_KEY = 'styleinnov_users';

class AuthService {
  constructor() {
    this.initializeUsers();
  }

  // Initialiser les utilisateurs depuis le JSON s'ils n'existent pas
  async initializeUsers() {
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
      try {
        const response = await fetch('/data/utilisateurs.json');
        const users = await response.json();
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
      }
    }
  }

  // Récupérer tous les utilisateurs
  getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Sauvegarder les utilisateurs
  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Inscription d'un nouvel utilisateur
  register(userData) {
    const users = this.getUsers();
    
    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Cet email est déjà utilisé' };
    }

    // Créer le nouvel utilisateur
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      password: userData.password, // En production, il faudrait hasher le mot de passe
      telephone: userData.telephone || '',
      dateInscription: new Date().toISOString().split('T')[0],
      role: 'client'
    };

    users.push(newUser);
    this.saveUsers(users);

    // Connecter automatiquement l'utilisateur après inscription
    const userToStore = { ...newUser };
    delete userToStore.password; // Ne pas stocker le mot de passe dans la session
    localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));

    return { success: true, user: userToStore };
  }

  // Connexion d'un utilisateur
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    // Stocker l'utilisateur connecté (sans le mot de passe)
    const userToStore = { ...user };
    delete userToStore.password;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));

    return { success: true, user: userToStore };
  }

  // Déconnexion
  logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  // Récupérer l'utilisateur connecté
  getCurrentUser() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Vérifier si un utilisateur est connecté
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Mettre à jour le profil utilisateur
  updateProfile(userId, updatedData) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: 'Utilisateur non trouvé' };
    }

    // Mettre à jour les données
    users[userIndex] = { ...users[userIndex], ...updatedData };
    this.saveUsers(users);

    // Mettre à jour la session si c'est l'utilisateur connecté
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...users[userIndex] };
      delete updatedUser.password;
      localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    }

    return { success: true };
  }
}

export default new AuthService();

