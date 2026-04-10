const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;