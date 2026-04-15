const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');

// Trending
router.get('/trending', async (req, res) => {
  const data = await tmdb.get('/trending/movie/week');
  res.json(data.data);
});

// Search
router.get('/search', async (req, res) => {
  const q = req.query.q;

  const data = await tmdb.get('/search/movie', {
    params: { query: q }
  });

  res.json(data.data);
});

// Films Populaires
router.get('/popular', async (req, res) => {
  const data = await tmdb.get('/movie/popular');
  res.json(data.data);
});

// Séries Populaires
router.get('/tv/popular', async (req, res) => {
  const data = await tmdb.get('/tv/popular');
  res.json(data.data);
});

// En fonction des notes
router.get('/top_rated', async (req, res) => {
  const data = await tmdb.get('/movie/top_rated');
  res.json(data.data);
});

// Genres en fonction de l'ID
router.get('/genre/:id', async (req, res) => {
  const data = await tmdb.get('/discover/movie', {
    params: { with_genres: req.params.id }
  });
  res.json(data.data);
});

// Obtenir details des films
router.get('/:id', async (req, res) => {
  try {
    const data = await tmdb.get(`/movie/${req.params.id}`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Movie not found" });
  }
});

// Obtenir le casting 
router.get('/:id/credits', async (req, res) => {
  try {
    const data = await tmdb.get(`/movie/${req.params.id}/credits`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Credits not found" });
  }
});

// Obtenir les films similaires
router.get('/:id/similar', async (req, res) => {
  try {
    const data = await tmdb.get(`/movie/${req.params.id}/similar`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Similar movies not found" });
  }
});

// Obtenir les vidéos (Bandes-annonces) du film
router.get('/:id/videos', async (req, res) => {
  try {
    const data = await tmdb.get(`/movie/${req.params.id}/videos`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Videos not found" });
  }
});

// --- ROUTES POUR LES DETAILS DES SERIES TV ---

router.get('/tv/:id', async (req, res) => {
  try {
    const data = await tmdb.get(`/tv/${req.params.id}`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "TV show not found" });
  }
});

router.get('/tv/:id/credits', async (req, res) => {
  try {
    const data = await tmdb.get(`/tv/${req.params.id}/credits`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "TV show credits not found" });
  }
});

router.get('/tv/:id/similar', async (req, res) => {
  try {
    const data = await tmdb.get(`/tv/${req.params.id}/similar`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Similar TV shows not found" });
  }
});

router.get('/tv/:id/videos', async (req, res) => {
  try {
    const data = await tmdb.get(`/tv/${req.params.id}/videos`);
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "TV show videos not found" });
  }
});

module.exports = router;