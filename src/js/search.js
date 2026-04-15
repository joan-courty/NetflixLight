const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let debounceTimeout;

// Chaque lettre tapée affiche un réssultat au bout de 300ms
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // On annule le compte à rebours précédent
        clearTimeout(debounceTimeout);

        // Si la recherche est trop courte, on cache les résultats
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            searchResults.classList.remove('flex');
            return;
        }

        debounceTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/movies/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                
                displaySearchResults(data.results);
            } catch (error) {
                console.error("Search error:", error);
            }
        }, 300); 
    });
}

const displaySearchResults = (movies) => {
    if (!movies || movies.length === 0) {
        searchResults.innerHTML = '<p class="p-4 text-sm text-gray-400">No results found.</p>';
        searchResults.classList.remove('hidden');
        searchResults.classList.add('flex');
        return;
    }

    // Affiche les 5 premiers résultats
    searchResults.innerHTML = movies.slice(0, 6).map(movie => {
        const imageUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
            : 'https://via.placeholder.com/200x300?text=No+Image';
            
        const title = movie.title || movie.name || "Unknown";
        const safeTitle = title.replace(/'/g, "\\'");
        return `
            <div onmousedown="goToSearchResult('${safeTitle}', '${imageUrl}', '${movie.id}')" 
                 class="flex items-center gap-3 p-3 hover:bg-slate-800 cursor-pointer transition border-b border-white/10 last:border-0">
                <img src="${imageUrl}" alt="${title}" class="w-10 h-14 object-cover rounded">
                <div>
                    <h4 class="text-sm font-bold text-white line-clamp-1">${title}</h4>
                    <span class="text-xs text-yellow-500">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        `;
    }).join('');

    searchResults.classList.remove('hidden');
    searchResults.classList.add('flex');
};

// Redirection vers le film
window.goToSearchResult = (title, image, id) => {
    const movieData = { title, image, id, type: 'movie' };
    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    
    // Nettoie la nav barre
    searchInput.value = '';
    searchResults.classList.add('hidden');
    searchResults.classList.remove('flex');
    
    //Rediriger vers la page détails
    window.location.hash = '#/details';
};

// On cache les résultats si on clique autre part
document.addEventListener('click', (e) => {
    if (searchInput && searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
        searchResults.classList.remove('flex');
    }
});