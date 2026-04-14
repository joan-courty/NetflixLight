const loadFilms = async () => {
    const container = document.getElementById('films-container');
    if (!container) return;

    container.innerHTML = '<p class="text-white text-center col-span-full">Loading movies...</p>';

    try {
        const response = await fetch('/movies/trending');
        const data = await response.json();

        const movies = data.results;

        container.innerHTML = ''; 
        
        if (!document.getElementById('hide-scrollbar-style')) {
            const style = document.createElement('style');
            style.id = 'hide-scrollbar-style';
            style.innerHTML = `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `;
            document.head.appendChild(style);
        }
        
        // On crée la boîte du carrousel
        const carouselContainer = document.createElement('div');
        carouselContainer.className = "flex overflow-x-auto gap-4 px-6 md:px-12 pb-8 pt-4 snap-x scroll-smooth no-scrollbar";
        carouselContainer.style.scrollbarWidth = "none";
        carouselContainer.style.msOverflowStyle = "none";
        movies.forEach(movie => {
            const filmDiv = document.createElement('div');
            filmDiv.className = "flex-shrink-0 w-36 md:w-48 snap-center group relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer hover:scale-110 hover:z-10 transition-all duration-300 shadow-xl aspect-[2/3]";
            const imageUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';
            const safeTitle = movie.title.replace(/'/g, "\\'");
            filmDiv.innerHTML = `
                <div onclick="showMovieDetails('${safeTitle}', '${imageUrl}', '${movie.id}')" 
                     class="group relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-2xl w-full h-full block">
                    <img src="${imageUrl}" alt="${movie.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 class="text-white font-bold text-lg leading-tight mb-1">${movie.title}</h3>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-yellow-400 text-sm font-bold">Mark : ${movie.vote_average.toFixed(1)}</span>
                            <span class="text-gray-300 text-xs">${movie.release_date ? movie.release_date.split('-')[0] : ''}</span>
                        </div>
                    </div>
                </div>
            `;
            carouselContainer.appendChild(filmDiv);
        });
        container.appendChild(carouselContainer);

    } catch (error) {
        console.error('Error the load of the movie:', error);
        container.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load movies from the server.</p>';
    }
};
window.showMovieDetails = (title, image, id) => {
    const movieData = { title, image, id };
    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    window.location.hash = '#/details';
};