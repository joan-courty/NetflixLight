const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// La fausse base de données en mémoire
const users = [];

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.json({ message: 'User created' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Wrong password' });

  // Si tu n'as pas de JWT_SECRET dans ton .env, on en met un par défaut pour éviter un crash
  const secret = process.env.JWT_SECRET || 'supersecretkey';
  const token = jwt.sign({ email }, secret);

  res.json({ token });
});

module.exports = router;