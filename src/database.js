const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// créer le fichier database.sqlite
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

// création des tables
db.serialize(() => {
  // USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // FAVORITES
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      movie_id INTEGER,
      title TEXT,
      poster TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
  
  CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT
  );
  
  CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    movie_id INTEGER
  );
  
  CREATE TABLE watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    movie_id INTEGER
  );
  
  CREATE TABLE history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    movie_id INTEGER,
    progress INTEGER
  );