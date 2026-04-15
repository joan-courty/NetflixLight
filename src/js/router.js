const updateNavbar = () => {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return;

    const savedUser = JSON.parse(localStorage.getItem('netflix_user'));

    if (savedUser && savedUser.pseudo) {
        authLink.innerText = savedUser.pseudo;
    } else {
        authLink.innerText = 'Login';
        authLink.href = '#/login';
    }
};

const views = {
    '#/': () => `
        <div id="hero-banner" class="w-full h-[80vh] relative mb-12 flex items-end pb-20 px-6 md:px-12 overflow-hidden">
            <div id="hero-bg" class="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            <div class="relative max-w-3xl z-10">
                <h1 id="hero-title" class="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter"></h1>
                <p id="hero-overview" class="text-lg text-gray-200 line-clamp-3 mb-8 max-w-xl"></p>
                <div class="flex gap-4">
                    <button id="hero-info" class="bg-gray-500/50 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-500/70 transition backdrop-blur-md">
                        More Info
                    </button>
                </div>
            </div>
        </div>

        <div id="home-content" class="container mx-auto flex flex-col gap-12">
            <div id="trending-home-container"></div>
            
            <div class="px-6 py-12 border-t border-white/10 mt-10">
                <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-4">Who are we?</h2>
                <p class="text-gray-400 italic">
                    It's a project made by COURTY Joan and ASLI Othmane, The goal of this project is to create an copy og Netflix, but without the movies because of copyright, so we've just created a website which shows all of the informations about the movies.
                </p>
            </div>
        </div>
    `,
    '#/films': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Movies</h2>
            <div id="films-container" class="flex flex-col gap-8">
            </div>
        </div>
    `,
   '#/details': () => `
        <div id="movie-details-container" class="relative min-h-screen pb-20 text-white">
            <div id="details-backdrop" class="absolute inset-0 w-full h-[70vh] bg-cover bg-center opacity-20"></div>
            
            <div class="relative container mx-auto px-6 pt-32">
                <div class="flex flex-col md:row gap-12">
                    <img id="details-poster" src="" class="w-64 h-96 rounded-2xl shadow-2xl border border-white/10 object-cover">
                    
                    <div class="flex-1">
                        <h1 id="details-title" class="text-5xl font-extrabold mb-4">Loading...</h1>
                        
                        <div class="flex items-center gap-4 mb-6 text-sm">
                            <span id="details-year" class="text-gray-400 font-bold"></span>
                            <span id="details-runtime" class="text-gray-400"></span>
                            <span id="details-rating" class="bg-red-700 px-3 py-1 rounded-full font-bold"></span>
                            <button id="favorite-btn" class="bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full border border-white/20 transition">
                                Add to Watchlist
                            </button>
                        </div>

                        <div id="details-genres" class="flex gap-2 mb-8"></div>

                        <h3 class="text-xl font-bold mb-2 text-red-600">Synopsis</h3>
                        <p id="details-overview" class="text-lg text-gray-300 leading-relaxed mb-10 max-w-3xl"></p>
                        
                        <h3 class="text-xl font-bold mb-4 border-l-4 border-red-700 pl-4">Main Cast</h3>
                        <div id="details-cast" class="flex gap-4 overflow-x-auto pb-6 no-scrollbar"></div>
                    </div>
                </div>

                <div class="mt-20">
                    <h3 class="text-2xl font-bold mb-6">Similar Content</h3>
                    <div id="similar-movies" class="flex gap-4 overflow-x-auto pb-8 no-scrollbar"></div>
                </div>
            </div>
        </div>
    `,
    '#/login': () => `
        <div class="max-w-md mx-auto mt-20 p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
            <h2 id="auth-title" class="text-3xl font-bold text-center mb-8 text-white">Login</h2>
            
            <form id="auth-form" class="flex flex-col gap-6">
                <div id="pseudo-field" class="hidden flex flex-col gap-2">
                    <label class="text-sm font-semibold ml-1">Username</label>
                    <input type="text" placeholder="Your username" class="bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition">
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold ml-1">Email</label>
                    <input type="email" placeholder="your@email.com" required class="bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition">
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold ml-1">Password</label>
                    <input type="password" placeholder="••••••••" required class="bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition">
                </div>

                <button type="submit" class="bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-900/20 mt-4">
                    Sign In
                </button>
            </form>

            <p class="text-center mt-6 text-gray-400 text-sm">
                <span id="auth-switch-text">Don't have an account?</span>
                <button id="auth-toggle" class="text-red-500 font-bold hover:underline ml-1">Sign Up</button>
            </p>
        </div>
    `,
    '#/favorites': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12 mb-20 text-white min-h-[60vh]">
            <h2 class="text-3xl font-extrabold border-l-4 border-red-900 pl-4 mb-8">My Watchlist</h2>
            
            <div id="favorites-container" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <p class="text-gray-400 col-span-full">Loading your favorites...</p>
            </div>
        </div>
    `,
};

const router = async () => {
    const path = window.location.hash || '#/';
    const savedUser = JSON.parse(localStorage.getItem('netflix_user'));
    if (!savedUser && path !== '#/login') {
        window.location.hash = '#/login';
        return;
    }

    if (savedUser && path === '#/login') {
        window.location.hash = '#/';
        return; 
    }
    const viewFunc = views[path] || views['#/'];
    document.getElementById('app-content').innerHTML = viewFunc();
    const searchContainer = document.getElementById('search-container');

    if (searchContainer) {
        if (path === '#/login') {
            searchContainer.classList.add('hidden');
            searchContainer.classList.remove('flex');
        } else {
            searchContainer.classList.remove('hidden');
            searchContainer.classList.add('flex');
        }
    }

    // Page de détails
    if (path === '#/details') {
        const movie = JSON.parse(localStorage.getItem('selectedMovie'));
        if (movie && movie.id) {
            if (typeof window.fetchFullDetails === 'function') {
                window.fetchFullDetails(movie.id);
            }
        }
    }

    // Page films
    if (path === '#/films') {
        searchContainer.classList.remove('hidden');
        searchContainer.classList.add('flex');
        if (typeof loadFilms === 'function') loadFilms(); 
    } else if (path === '#/') {
        if (typeof window.loadHome === 'function') window.loadHome();
        searchContainer.classList.add('hidden');
        searchContainer.classList.remove('flex');
    } else {
        searchContainer.classList.add('hidden');
        searchContainer.classList.remove('flex');
    }

    // Page Favoris
    if (path === '#/favorites') {
        if (searchContainer) {
            searchContainer.classList.add('hidden');
            searchContainer.classList.remove('flex');
        }
        if (typeof window.loadFavorites === 'function') window.loadFavorites();
    }
    
    // Page Login / Inscription
    if (path === '#/login') {
        const authForm = document.getElementById('auth-form');
        const toggleBtn = document.getElementById('auth-toggle');
        const pseudoField = document.getElementById('pseudo-field');
        const authTitle = document.getElementById('auth-title');
        const submitBtn = authForm.querySelector('button[type="submit"]');
        const switchText = document.getElementById('auth-switch-text');

        let isLoginMode = true;

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;

                if (isLoginMode) {
                    pseudoField.classList.add('hidden');
                    pseudoField.querySelector('input').removeAttribute('required');
                    authTitle.innerText = 'Login';
                    submitBtn.innerText = 'Sign In';
                    switchText.innerText = "Don't have an account?";
                    toggleBtn.innerText = "Sign Up";
                } else {
                    pseudoField.classList.remove('hidden');
                    pseudoField.querySelector('input').setAttribute('required', 'true');
                    authTitle.innerText = 'Sign Up';
                    submitBtn.innerText = "Sign Up";
                    switchText.innerText = 'Already have an account?';
                    toggleBtn.innerText = 'Sign In';
                }
            });
        }

        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = authForm.querySelector('input[type="email"]').value;
                const password = authForm.querySelector('input[type="password"]').value;

                if (isLoginMode) {
                    const savedUser = JSON.parse(localStorage.getItem('netflix_user'));
                    if (savedUser && savedUser.email === email) {
                        alert(`Welcome back, ${savedUser.pseudo}!`);
                        window.location.hash = '#/';
                    } else {
                        alert("Incorrect credentials or account does not exist.");
                    }
                } else {
                    const pseudo = pseudoField.querySelector('input').value;
                    const newUser = { email, pseudo, password };
                    localStorage.setItem('netflix_user', JSON.stringify(newUser));
                    alert(`Registration successful! Welcome ${pseudo}.`);
                    window.location.hash = '#/';
                }
            });
        }
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);