const express = require('express');
const router = express.Router();
const db = require('../db/database');

// REGISTER
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  db.run(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Utilisateur existe déjà' });
      }
      res.json({ id: this.lastID, email });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, user) => {
      if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
      res.json(user);
    }
  );
});

module.exports = router;
