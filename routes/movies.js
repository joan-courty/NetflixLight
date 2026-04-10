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

module.exports = router;