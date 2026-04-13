async function loadFilms() {
    try {
        const response = await fetch('../data/films.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const films = await response.json();
        const container = document.getElementById('films-container');
        
        container.innerHTML = '';
        films.forEach(film => {
            const filmDiv = document.createElement('div');
            filmDiv.className = 'flex flex-col gap-4 w-full';
            const imageUrl = film.image || 'https://via.placeholder.com/300x300?text=No+Image';
            
            filmDiv.innerHTML = `
                <div class="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition duration-300 relative cursor-pointer">
                    <img src="${imageUrl}" alt="${film.name}" class="w-full h-full object-cover">
                    <h3 class="absolute bottom-0 left-0 right-0 text-white text-center font-bold text-xl uppercase tracking-wider bg-black/50 p-2">
                        ${film.name}
                    </h3>
                </div>
            `;
            container.appendChild(filmDiv);
        });
    } catch (error) {
        console.error('Error during the load of films:', error);
        document.getElementById('films-container').innerHTML = '<p class="text-red-500">Error during the load of films.</p>';
    }
}
