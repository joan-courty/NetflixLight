const views = {
    '#/': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Who are we?</h2>
            <div class="font-bold text-white pl-4 mb-8">
            <div class="font-bold text-white pl-4 mb-8">
            It's a project made by COURTY Joan and ASLI Othmane, The goal of this project is to create an copy og Netflix, but without the movies because of copyright, so we've just created a website which shows all of the informations about the movies.
        </div>
        <div class="text-2xl font-bold text-white pl-20 mb-8">HAVE ENJOY !</div>
        </div>
    `,
    '#/films': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Films</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" id="films-container">
            </div>
        </div>
    `,
    '#/login': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Login</h2>
            <p class="pl-4">Interface de connexion en cours de développement...</p>
        </div>
    `
};
const router = async () => {
    const path = window.location.hash || '#/';
    const viewFunc = views[path] || views['#/'];
    
    document.getElementById('app-content').innerHTML = viewFunc();

    //Pour la barre de recherche pour qu'elle soit visible uniquement sur la page /films
    const searchContainer = document.getElementById('search-container');
    if (path === '#/films') {
        searchContainer.classList.remove('hidden');
        loadFilms(); 
    } else {
        searchContainer.classList.add('hidden');
    }
};

// Détecte quand l'URL change (clic sur un lien)
window.addEventListener('hashchange', router);
//Détecte le premier chargement de page
window.addEventListener('load', router);