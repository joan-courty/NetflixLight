# NetflixLight - Clone VOD

**NetflixLight** est un prototype fonctionnel d'application de vidéo à la demande (VOD), développé de A à Z (Frontend & Backend). L'objectif du projet est de proposer une interface utilisateur fluide, dynamique et immersive, alimentée par de véritables données cinématographiques.

 **Auteurs :** Joan COURTY & Othmane ASLI

---

## 1. Instructions d'installation

Pour exécuter ce projet localement sur votre machine, suivez ces étapes :

### Prérequis
* [Node.js](https://nodejs.org/) (version 14 ou supérieure) installé.
* Un terminal (Git Bash, WSL, ou terminal macOS/Linux).

### Déploiement
1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/joan-courty/NetflixLight.git](https://github.com/joan-courty/NetflixLight.git)
   cd NetflixLight
Installer les dépendances :

Bash
npm install
Lancer le serveur :

Bash
npm start
Ouvrez votre navigateur et accédez à l'adresse : http://localhost:3000

 2. Configuration de l'API TMDB (Clé API)
Ce projet consomme l'API de The Movie Database (TMDB) pour récupérer le catalogue de films et séries. Pour des raisons de sécurité, les clés API ne sont pas versionnées sur GitHub.

Vous devez créer un fichier nommé .env à la racine du projet (au même niveau que server.js) et y ajouter vos clés de configuration :

Extrait de code
# Fichier .env
TMDB_API_KEY=votre_cle_api_tmdb_ici
JWT_SECRET=une_cle_secrete_pour_les_sessions_utilisateurs
Note : Le fichier .env est ignoré par Git grâce au .gitignore pour éviter toute fuite de données sensibles.

 3. Architecture du projet
Le projet suit une architecture modulaire séparant clairement l'interface client (Frontend) du serveur (Backend).

Plaintext

NetflixLight/
├── src/                      # FRONTEND (Client)
│   ├── js/                   # Logique métier (Vanilla JS)
│   │   ├── router.js         # Moteur SPA et gestion d'état (Authentification)
│   │   ├── films.js          # Affichage de l'accueil et des carrousels
│   │   ├── details.js        # Vue détaillée d'un média (Trailers, Casting)
│   │   ├── search.js         # Moteur de recherche instantané
│   │   └── favorites.js      # Espace personnel (Watchlist)
│   └── templates/
│       └── index.html        # Point d'entrée unique de l'application
├── routes/                   # BACKEND (API Express)
│   ├── auth.js               # Inscription, Connexion et Hachage (Bcrypt)
│   ├── movies.js             # Passerelle sécurisée vers l'API TMDB
│   └── user.js               # Gestion des listes de favoris
├── utils/
│   └── tmdb.js               # Instance Axios préconfigurée (Injections de la clé API)
├── .env                      # Variables d'environnement (À créer)
├── package.json              # Dépendances du projet (Express, Axios, Bcrypt...)
└── server.js                 # Point d'entrée du serveur Node.js

4. Choix techniques justifiés

Frontend

Vanilla JavaScript & Architecture SPA : Nous avons fait le choix de ne pas utiliser de framework (comme React ou Vue) afin de consolider notre compréhension fondamentale du DOM. La création d'un routeur natif basé sur l'événement hashchange permet une navigation ultra-fluide sans aucun rechargement de page (Single Page Application).

Tailwind CSS (via CDN) : Ce framework utilitaire nous a permis de prototyper rapidement une interface complexe et responsive, tout en gardant un fichier HTML propre sans avoir à basculer constamment entre des fichiers CSS externes.

Optimisation des performances (Promise.all) : Sur la page de détails, plutôt que d'enchaîner les requêtes (Détails, Casting, Vidéos, Favoris), nous utilisons Promise.all pour paralléliser les appels réseau, divisant ainsi le temps de chargement par 4.

Algorithme de Debounce (Recherche) : Pour éviter de saturer l'API TMDB lors de la frappe de l'utilisateur dans la barre de recherche, nous avons implémenté un délai de 300ms (setTimeout / clearTimeout). La requête ne part que lorsque l'utilisateur marque une pause.

Vrais Trailers (IFrame YouTube) vs Lecteur Personnalisé : Bien qu'un lecteur vidéo HTML5 avec contrôles personnalisés ait été envisagé, nous avons privilégié l'immersion et le réalisme en intégrant les véritables bandes-annonces officielles de TMDB via l'API YouTube IFrame.

Backend

Node.js & Express : Une stack JavaScript complète (Full-Stack JS) a facilité le développement et la communication entre le client et le serveur.

Sécurité & JWT : Les mots de passe utilisateurs ne sont jamais stockés en clair (hachage avec bcrypt). L'authentification repose sur des JSON Web Tokens (JWT) persistés côté client (localStorage).

Instance Axios centralisée : L'utilisation d'Axios nous a permis de créer une instance préconfigurée (utils/tmdb.js) qui injecte automatiquement notre clé API secrète dans chaque requête, gardant ainsi nos fichiers de routes très propres.

Gestion des Données (Note de version) : Pour assurer la stabilité absolue du prototype lors de la présentation, les données utilisateurs (comptes et Watchlist) sont actuellement gérées via la mémoire vive du serveur (tableaux JavaScript). L'implémentation de la persistance via SQLite a été testée mais temporairement retirée (Rollback) pour éviter des conflits de chemins d'accès (MODULE_NOT_FOUND) de dernière minute.