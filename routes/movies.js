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

module.exports = router;