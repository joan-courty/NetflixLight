const createCarouselRow = async (container, title, endpoint) => {
    const rowWrapper = document.createElement('div');
    rowWrapper.className = "w-full relative mb-8";

    // Titre de la catégorie
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = "text-xl md:text-2xl font-bold text-white mb-2 px-6 md:px-12";
    sectionTitle.innerText = title;
    rowWrapper.appendChild(sectionTitle);

    // Boîte du carrousel
    const carouselContainer = document.createElement('div');
    carouselContainer.className = "flex overflow-x-auto gap-4 px-6 md:px-12 pb-8 pt-4 snap-x scroll-smooth no-scrollbar";
    carouselContainer.style.scrollbarWidth = "none";
    carouselContainer.style.msOverflowStyle = "none";

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const movies = data.results;

        movies.forEach(movie => {
            const filmDiv = document.createElement('div');
            filmDiv.className = "flex-shrink-0 w-36 md:w-48 snap-center group relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer hover:scale-110 hover:z-10 transition-all duration-300 shadow-xl aspect-[2/3]";

            const imageUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';

            // Gestion du titre
            const displayTitle = movie.title || movie.name;
            const safeTitle = displayTitle ? displayTitle.replace(/'/g, "\\'") : "Inconnu";
            
            // Gestion de la date
            const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : (movie.first_air_date ? movie.first_air_date.split('-')[0] : '');

            filmDiv.innerHTML = `
                <div onclick="showMovieDetails('${safeTitle}', '${imageUrl}', '${movie.id}')" 
                     class="group relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-2xl w-full h-full block">
                    <img src="${imageUrl}" alt="${displayTitle}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 class="text-white font-bold text-lg leading-tight mb-1">${displayTitle}</h3>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-yellow-400 text-sm font-bold">Mark : ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                            <span class="text-gray-300 text-xs">${releaseYear}</span>
                        </div>
                    </div>
                </div>
            `;
            carouselContainer.appendChild(filmDiv);
        });
    } catch (error) {
        console.error(`Error loading ${title}:`, error);
        carouselContainer.innerHTML = `<p class="text-red-500 text-sm px-6 md:px-12">Impossible de charger : ${title}.</p>`;
    }

    rowWrapper.appendChild(carouselContainer);
    container.appendChild(rowWrapper);
};

window.loadHome = async () => {
    const banner = document.getElementById('hero-banner');
    const trendingContainer = document.getElementById('trending-home-container');
    if (!trendingContainer) return;

    try {
        const response = await fetch('/movies/trending');
        const data = await response.json();
        const movies = data.results;

        // Gestion du hero banner
        const randomIndex = Math.floor(Math.random() * movies.length);
        const hero = movies[randomIndex];

        document.getElementById('hero-bg').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`;
        document.getElementById('hero-title').innerText = hero.title || hero.name;
        document.getElementById('hero-overview').innerText = hero.overview;
        
        // Banner clicable
        document.getElementById('hero-info').onclick = () => showMovieDetails(
            (hero.title || hero.name).replace(/'/g, "\\'"), 
            `https://image.tmdb.org/t/p/w500${hero.poster_path}`, 
            hero.id, 
            hero.media_type
        );

        // Gestion carrousel
        trendingContainer.innerHTML = ''; // Clear
        await createCarouselRow(trendingContainer, "Current Trends", "/movies/trending", "movie");

    } catch (error) {
        console.error("Error loading home:", error);
    }
};

window.loadFilms = async () => {
    const container = document.getElementById('films-container');
    if (!container) return;

    container.innerHTML = '';

    if (!document.getElementById('hide-scrollbar-style')) {
        const style = document.createElement('style');
        style.id = 'hide-scrollbar-style';
        style.innerHTML = `.no-scrollbar::-webkit-scrollbar { display: none; }`;
        document.head.appendChild(style);
    }

    //Tout les carrousels
    await createCarouselRow(container, "Current trends", "/movies/trending");
    await createCarouselRow(container, "Popular Movies", "/movies/popular");
    await createCarouselRow(container, "Popular TV Shows", "/movies/tv/popular");
    await createCarouselRow(container, "Top Rated", "/movies/top_rated");
    await createCarouselRow(container, "Action", "/movies/genre/28");
    await createCarouselRow(container, "Comedy", "/movies/genre/35");
    await createCarouselRow(container, "Horror", "/movies/genre/27");
};

window.showMovieDetails = (title, image, id) => {
    const movieData = { title, image, id };
    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    window.location.hash = '#/details';
};