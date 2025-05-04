const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables if they do not exist
db.serialize(() => {
  // ParliamentEntry table
  db.run(`
    CREATE TABLE IF NOT EXISTS ParliamentEntry (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      law TEXT NOT NULL,
      lawUrl TEXT,
      region TEXT NOT NULL,
      construction TEXT NOT NULL,
      cash REAL NOT NULL,
      gold REAL NOT NULL,
      bbl REAL NOT NULL,
      kg REAL NOT NULL
    )
  `);

  // AutonomousRegion table
  db.run(`
    CREATE TABLE IF NOT EXISTS AutonomousRegion (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      coatOfArms TEXT NOT NULL
    )
  `);

  // DataSource table
  db.run(`
    CREATE TABLE IF NOT EXISTS DataSource (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      description TEXT NOT NULL,
      active INTEGER NOT NULL,
      lastFetched TEXT
    )
  `);
});

module.exports = db;
