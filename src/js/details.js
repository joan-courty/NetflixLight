window.fetchFullDetails = async (movieId) => {
    try {
        const [detailsRes, creditsRes, similarRes] = await Promise.all([
            fetch(`/movies/${movieId}`),
            fetch(`/movies/${movieId}/credits`),
            fetch(`/movies/${movieId}/similar`)
        ]);

        const details = await detailsRes.json();
        const credits = await creditsRes.json();
        const similar = await similarRes.json();

        // Info
        document.getElementById('details-title').innerText = details.title || details.name;
        document.getElementById('details-overview').innerText = details.overview || "No description available.";
        document.getElementById('details-year').innerText = (details.release_date || details.first_air_date || "").split('-')[0];
        document.getElementById('details-rating').innerText = `Mark : ${details.vote_average.toFixed(1)}`;
        document.getElementById('details-runtime').innerText = details.runtime ? `${details.runtime} min` : `${details.number_of_seasons} Seasons`;
        document.getElementById('details-poster').src = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
        document.getElementById('details-backdrop').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`;

        // Genres
        const genresContainer = document.getElementById('details-genres');
        genresContainer.innerHTML = details.genres.map(g => 
            `<span class="text-xs border border-gray-600 px-2 py-1 rounded text-gray-400">${g.name}</span>`
        ).join('');

        // Casting
        const castContainer = document.getElementById('details-cast');
        castContainer.innerHTML = credits.cast.slice(0, 10).map(actor => `
            <div class="flex-shrink-0 w-24 text-center">
                <img src="${actor.profile_path ? 'https://image.tmdb.org/t/p/w200' + actor.profile_path : 'https://via.placeholder.com/200x300'}" 
                     class="w-20 h-20 object-cover rounded-full mx-auto mb-2 border-2 border-white/10">
                <p class="text-[10px] font-bold truncate">${actor.name}</p>
                <p class="text-[9px] text-gray-500 truncate">${actor.character}</p>
            </div>
        `).join('');

        // Films similaires
        const similarContainer = document.getElementById('similar-movies');
        similarContainer.innerHTML = similar.results.slice(0, 8).map(m => `
            <div class="flex-shrink-0 w-32 cursor-pointer hover:scale-105 transition" 
                 onclick="showMovieDetails('${(m.title || m.name).replace(/'/g, "\\'")}', 'https://image.tmdb.org/t/p/w500${m.poster_path}', '${m.id}')">
                <img src="https://image.tmdb.org/t/p/w300${m.poster_path}" class="rounded-lg shadow-lg">
            </div>
        `).join('');

    } catch (err) {
        console.error("Failed to load movie details:", err);
    }
};

document.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'favorite-btn') {
        const movie = JSON.parse(localStorage.getItem('selectedMovie'));

        e.target.innerText = "In Watchlist";
        e.target.classList.add('text-red-500');
        try {
            await fetch('/user/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId: movie.id })
            });
        } catch (e) {
            console.log("Backend route /user/favorites not ready yet.");
        }
    }
});