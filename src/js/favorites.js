window.loadFavorites = async () => {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    try {
        const response = await fetch('/user/favorites');
        const favoriteIds = await response.json(); 

        if (favoriteIds.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-gray-400 text-xl mb-4">Your watchlist is empty.</p>
                    <a href="#/films" class="text-red-500 hover:text-red-400 font-bold underline">Go find some movies!</a>
                </div>
            `;
            return;
        }

        container.innerHTML = '';

        const moviesPromises = favoriteIds.map(id => fetch(`/movies/${id}`).then(res => res.json()));
        const movies = await Promise.all(moviesPromises);

        // 3. On dessine la grille
        movies.forEach(movie => {
            //CHeck si le film existe
            if (movie.error) return; 

            const filmDiv = document.createElement('div');
            filmDiv.className = "group relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl aspect-[2/3]";

            const imageUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';

            const displayTitle = movie.title || movie.name || "Unknown";
            const safeTitle = displayTitle.replace(/'/g, "\\'");

            filmDiv.innerHTML = `
                <div onclick="showMovieDetails('${safeTitle}', '${imageUrl}', '${movie.id}')" class="w-full h-full block relative">
                    <img src="${imageUrl}" alt="${displayTitle}" class="w-full h-full object-cover">
                    
                    <button onclick="event.stopPropagation(); removeFromFavorites('${movie.id}')" 
                            class="absolute top-2 right-2 bg-red-600/90 hover:bg-red-500 text-white w-8 h-8 rounded-full font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                            title="Remove from Watchlist">
                        ✕
                    </button>

                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                        <h4 class="text-white font-bold text-sm md:text-base leading-tight mb-1">${displayTitle}</h4>
                    </div>
                </div>
            `;
            container.appendChild(filmDiv);
        });

    } catch (error) {
        console.error("Error loading favorites:", error);
        container.innerHTML = '<p class="text-red-500 col-span-full">Failed to load favorites. Make sure the backend is running!</p>';
    }
};

window.removeFromFavorites = async (id) => {
    try {
        const response = await fetch(`/user/favorites/${id}`, { 
            method: 'DELETE' 
        });
        
        if (response.ok) {
            window.loadFavorites(); 
        }
    } catch (error) {
        console.error("Error removing movie:", error);
    }
};