require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

// 2. LES ROUTES API
app.use('/auth', require('./routes/auth'));
app.use('/movies', require('./routes/movies'));
app.use('/user', require('./routes/user'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/templates/index.html'));
});
console.log("TMDB API Key loaded:", process.env.TMDB_API_KEY ? "Yes" : "No"); 
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});