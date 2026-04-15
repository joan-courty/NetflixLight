# NetflixLight

**NetflixLight** est un prototype fonctionnel d'application de VOD (Video On Demand) inspiré de Netflix. Ce projet a été développé de A à Z (Frontend & Backend) dans le but d'offrir une interface utilisateur fluide, dynamique et immersive.

**Auteurs :** Joan COURTY & Othmane ASLI

---

## Fonctionnalités Principales

* **Architecture SPA (Single Page Application) :** Navigation ultra-fluide sans aucun rechargement de page grâce à un routeur JavaScript natif personnalisé.
* **Catalogue Dynamique :** Consommation de l'API externe **TMDB** (The Movie Database) pour afficher les tendances, les films les mieux notés, et trier par genres (Action, Comédie, etc.).
* **Recherche Intelligente :** Barre de recherche globale optimisée avec un algorithme de **Debounce (300ms)** pour limiter les appels réseau et préserver l'API.
* **Page Détails Immersive :** Affichage optimisé (via `Promise.all`) du synopsis, de la note, du casting et intégration directe des **Bandes-annonces YouTube officielles**.
* **Espace Utilisateur :**
  * Inscription et Connexion sécurisées (hachage des mots de passe).
  * Gestion de session avec des **Tokens JWT** et persistance locale (`localStorage`).
  * **Watchlist (Favoris) :** Ajout et suppression instantanés de films dans une liste de favoris personnelle.

---

## Stack Technique

### Frontend (Interface Client)
* **HTML5 & CSS3**
* **Tailwind CSS** (via CDN pour un prototypage rapide et un design responsive)
* **Vanilla JavaScript (ES6+)** : Manipulation du DOM, requêtes asynchrones (`fetch`, `async/await`), architecture modulaire. *Aucun framework (ni React, ni Vue) n'a été utilisé.*

### Backend (Serveur API)
* **Node.js & Express.js** : Création de notre propre API RESTful.
* **Axios** : Configuration centralisée pour les requêtes vers l'API TMDB.
* **Bcrypt & JSONWebToken (JWT)** : Sécurité, hachage et authentification.
* **CORS** : Gestion des autorisations de requêtes croisées.

---

## Installation et Lancement

Pour tester l'application en local sur votre machine, suivez ces étapes :

### 1. Prérequis
* [Node.js](https://nodejs.org/) (version 14 ou supérieure) installé sur votre machine.
* Une clé d'API valide de [The Movie Database (TMDB)](https://www.themoviedb.org/).

### 2. Cloner et préparer le projet
Ouvrez un terminal et exécutez les commandes suivantes :

```bash

git clone [https://github.com/joan-courty/NetflixLight.git](https://github.com/joan-courty/NetflixLight.git)
cd NetflixLight

npm install