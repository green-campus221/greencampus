// Configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Vérifier si l'utilisateur est sur la page de connexion
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Connexion avec Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Connexion réussie, redirection vers le tableau de bord
        window.location.href = 'admin-dashboard.html';
      })
      .catch((error) => {
        // Gestion des erreurs de connexion
        errorMessage.textContent = "Erreur de connexion: " + error.message;
        errorMessage.style.display = "block";
      });
  });
}

// Vérifier si l'utilisateur est sur la page du tableau de bord
if (document.querySelector('.admin-container')) {
  // Vérifier si l'utilisateur est connecté
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // L'utilisateur est connecté
      if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.email;
      }
    } else {
      // L'utilisateur n'est pas connecté, redirection vers la page de connexion
      window.location.href = 'admin-login.html';
    }
  });

  // Gérer la déconnexion
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      firebase.auth().signOut()
        .then(() => {
          // Déconnexion réussie
          window.location.href = 'admin-login.html';
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion:", error);
        });
    });
  }

  // Navigation entre les sections
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.content-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Retirer la classe active de tous les liens
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Ajouter la classe active au lien cliqué
      this.classList.add('active');
      
      // Récupérer la section cible
      const targetSection = this.getAttribute('data-section');
      
      // Masquer toutes les sections
      contentSections.forEach(section => section.classList.remove('active'));
      
      // Afficher la section cible
      document.getElementById(targetSection).classList.add('active');
      
      // Mettre à jour le titre de la page
      document.querySelector('.main-title h1').textContent = this.textContent.trim();
      
      // Sur mobile, fermer le menu après la sélection
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
      }
    });
  });

  // Gestion du menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('active');
      }
    }
  });

  // Fonctions de gestion de la base de données Firebase
  // (Ces fonctions seront implémentées en fonction de vos besoins spécifiques)

  // Exemple: Fonction pour récupérer les filières depuis Firestore
  function loadFilieres() {
    const filieresList = document.getElementById('filieresList');
    if (!filieresList) return;

    firebase.firestore().collection('filieres').get()
      .then((querySnapshot) => {
        filieresList.innerHTML = '';
        querySnapshot.forEach((doc) => {
          const filiere = doc.data();
          // Créer une ligne de tableau pour chaque filière
          // (Ce code sera adapté en fonction de votre structure de données)
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des filières:", error);
      });
  }

  // Charger les données initiales
  // loadFilieres();
}
