const db = require('./db');
const fs = require('fs');
const path = require('path');

console.log('Setting up the database...');

// The db.js file automatically creates the database and tables on require
// Now run the migrate script to seed the database

const DATA_FILE = path.join(__dirname, 'entries.json');

try {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  const entries = JSON.parse(data);

  db.serialize(() => {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO ParliamentEntry
      (id, date, law, lawUrl, region, construction, cash, gold, bbl, kg)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    entries.forEach(entry => {
      const { id, date, law, lawUrl, region, construction, resources } = entry;
      const { cash, gold, bbl, kg } = resources || {};
      stmt.run(id, date, law, lawUrl, region, construction, cash, gold, bbl, kg);
    });

    stmt.finalize(() => {
      console.log('Migration completed successfully.');
      process.exit(0);
    });
  });
} catch (err) {
  console.error('Error reading entries.json:', err);
  process.exit(1);
}
