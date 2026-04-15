const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Ajouter favori
router.post('/favorites', (req, res) => {
  const { user_id, movie_id, title, poster } = req.body;

  db.run(
    `INSERT INTO favorites (user_id, movie_id, title, poster)
     VALUES (?, ?, ?, ?)`,
    [user_id, movie_id, title, poster],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Ajouté aux favoris' });
    }
  );
});

// Récupérer favoris
router.get('/favorites/:user_id', (req, res) => {
  db.all(
    `SELECT * FROM favorites WHERE user_id = ?`,
    [req.params.user_id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

// Supprimer favori
router.delete('/favorites/:id', (req, res) => {
  db.run(`DELETE FROM favorites WHERE id = ?`, [req.params.id], function () {
    res.json({ message: 'Supprimé' });
  });
});

module.exports = router;