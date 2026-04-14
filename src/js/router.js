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
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Who are we?</h2>
            <div class="font-bold text-white pl-4 mb-8">
                It's a project made by COURTY Joan and ASLI Othmane, The goal of this project is to create an copy og Netflix, but without the movies because of copyright, so we've just created a website which shows all of the informations about the movies.
            </div>
            <div class="text-2xl font-bold text-white pl-20 mb-8">ENJOY !</div>
        </div>
    `,
    '#/films': () => `
        <div class="max-w-6xl mx-auto px-6 mt-12">
            <h2 class="text-2xl font-bold text-white border-l-4 border-red-900 pl-4 mb-8">Movies</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" id="films-container">
            </div>
        </div>
    `,
    '#/details': () => `
        <div id="movie-details-container" class="relative min-h-screen">
            <div id="details-backdrop" class="absolute inset-0 w-full h-[70vh] bg-cover bg-center opacity-30 mask-gradient"></div>
            
            <div class="relative container mx-auto px-6 pt-32 flex flex-col md:flex-row gap-12">
                <img id="details-poster" src="" class="w-64 h-96 rounded-2xl shadow-2xl border border-white/10 object-cover">
                
                <div class="flex-1">
                    <h1 id="details-title" class="text-5xl font-extrabold mb-4">Loading...</h1>
                    <div class="flex items-center gap-4 mb-6">
                        <span id="details-year" class="text-gray-400 font-bold"></span>
                        <span id="details-rating" class="bg-red-900 px-3 py-1 rounded-full text-sm font-bold"></span>
                        <button id="add-favorite" class="text-red-500 hover:text-red-400 transition text-2xl">Like</button>
                    </div>
                    <p id="details-overview" class="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl"></p>
                    
                    <h3 class="text-xl font-bold mb-4 border-l-4 border-red-700 pl-4">Main Cast</h3>
                    <div id="details-cast" class="flex gap-4 overflow-x-auto pb-4">
                        </div>
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
    `
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
        if (path === '#/films') {
            searchContainer.classList.remove('hidden');
            searchContainer.classList.add('flex');
            if (typeof loadFilms === 'function') loadFilms(); 
        } else {
            searchContainer.classList.add('hidden');
            searchContainer.classList.remove('flex');
        }
    }

    // Page de détails
    if (path === '#/details') {
        const movie = JSON.parse(localStorage.getItem('selectedMovie'));
        if (movie) {
            document.getElementById('details-title').innerText = movie.name;
            document.getElementById('details-poster').src = movie.image || 'https://via.placeholder.com/300x300?text=No+Image';
            document.getElementById('details-backdrop').style.backgroundImage = `url(${movie.image || ''})`;
            document.getElementById('details-overview').innerText = "Synopsis coming soon from the TMDB API...";
        }
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