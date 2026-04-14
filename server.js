require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/movies', require('./routes/movies'));
app.use('/user', require('./routes/user'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
require('dotenv').config();

console.log(process.env.TMDB_API_KEY); 