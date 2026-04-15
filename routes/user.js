const express = require('express');
const router = express.Router();

// La fausse base de données en mémoire
let favorites = [];

// Ajouter
router.post('/favorites', (req, res) => {
  const { movieId } = req.body;
  
  // Évite les doublons
  if (!favorites.includes(movieId)) {
      favorites.push(movieId);
  }
  res.json({ message: 'Added to favorites' });
});

// Récupérer
router.get('/favorites', (req, res) => {
  res.json(favorites);
});

// Supprimer (Avec la correction de type String !)
router.delete('/favorites/:id', (req, res) => {
  const id = req.params.id;
  favorites = favorites.filter(f => String(f) !== String(id));
  res.json({ message: 'Removed' });
});

module.exports = router;