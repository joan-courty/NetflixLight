const express = require('express');
const router = express.Router();

let favorites = [];

// ajouter
router.post('/favorites', (req, res) => {
  const { movieId } = req.body;

  favorites.push(movieId);

  res.json({ message: 'Added to favorites' });
});

// récupérer
router.get('/favorites', (req, res) => {
  res.json(favorites);
});

// supprimer
router.delete('/favorites/:id', (req, res) => {
  const id = parseInt(req.params.id);

  favorites = favorites.filter(f => f !== id);

  res.json({ message: 'Removed' });
});

module.exports = router;