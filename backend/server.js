const express = require('express');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Helper to convert row to ParliamentEntry object
function rowToEntry(row) {
  return {
    id: row.id,
    date: row.date,
    law: row.law,
    lawUrl: row.lawUrl,
    region: row.region,
    construction: row.construction,
    resources: {
      cash: row.cash,
      gold: row.gold,
      bbl: row.bbl,
      kg: row.kg
    }
  };
}

// GET /entries - get all manual entries
app.get('/entries', (req, res) => {
  db.all('SELECT * FROM ParliamentEntry', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const entries = rows.map(rowToEntry);
    res.json(entries);
  });
});

// POST /entries - add a new manual entry
app.post('/entries', (req, res) => {
  const id = uuidv4();
  const { date, law, lawUrl, region, construction, resources } = req.body;
  const { cash, gold, bbl, kg } = resources || {};
  const sql = `
    INSERT INTO ParliamentEntry (id, date, law, lawUrl, region, construction, cash, gold, bbl, kg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [id, date, law, lawUrl, region, construction, cash, gold, bbl, kg], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, date, law, lawUrl, region, construction, resources });
  });
});

// PUT /entries/:id - update an existing entry
app.put('/entries/:id', (req, res) => {
  const { id } = req.params;
  const { date, law, lawUrl, region, construction, resources } = req.body;
  const { cash, gold, bbl, kg } = resources || {};
  const sql = `
    UPDATE ParliamentEntry
    SET date = ?, law = ?, lawUrl = ?, region = ?, construction = ?, cash = ?, gold = ?, bbl = ?, kg = ?
    WHERE id = ?
  `;
  db.run(sql, [date, law, lawUrl, region, construction, cash, gold, bbl, kg, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ id, date, law, lawUrl, region, construction, resources });
  });
});

// DELETE /entries/:id - delete an entry
app.delete('/entries/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ParliamentEntry WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.status(204).send();
  });
});

// CRUD for AutonomousRegion
app.get('/autonomousRegions', (req, res) => {
  db.all('SELECT * FROM AutonomousRegion', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/autonomousRegions', (req, res) => {
  const id = uuidv4();
  const { name, title, coatOfArms } = req.body;
  const sql = `
    INSERT INTO AutonomousRegion (id, name, title, coatOfArms)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [id, name, title, coatOfArms], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, name, title, coatOfArms });
  });
});

app.put('/autonomousRegions/:id', (req, res) => {
  const { id } = req.params;
  const { name, title, coatOfArms } = req.body;
  const sql = `
    UPDATE AutonomousRegion
    SET name = ?, title = ?, coatOfArms = ?
    WHERE id = ?
  `;
  db.run(sql, [name, title, coatOfArms, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'AutonomousRegion not found' });
    }
    res.json({ id, name, title, coatOfArms });
  });
});

app.delete('/autonomousRegions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM AutonomousRegion WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'AutonomousRegion not found' });
    }
    res.status(204).send();
  });
});

// CRUD for DataSource
app.get('/dataSources', (req, res) => {
  db.all('SELECT * FROM DataSource', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Convert active from integer to boolean
    const dataSources = rows.map(row => ({
      ...row,
      active: row.active === 1
    }));
    res.json(dataSources);
  });
});

app.post('/dataSources', (req, res) => {
  const id = uuidv4();
  const { url, description, active, lastFetched } = req.body;
  const sql = `
    INSERT INTO DataSource (id, url, description, active, lastFetched)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [id, url, description, active ? 1 : 0, lastFetched], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, url, description, active, lastFetched });
  });
});

app.put('/dataSources/:id', (req, res) => {
  const { id } = req.params;
  const { url, description, active, lastFetched } = req.body;
  const sql = `
    UPDATE DataSource
    SET url = ?, description = ?, active = ?, lastFetched = ?
    WHERE id = ?
  `;
  db.run(sql, [url, description, active ? 1 : 0, lastFetched, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'DataSource not found' });
    }
    res.json({ id, url, description, active, lastFetched });
  });
});

app.delete('/dataSources/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM DataSource WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'DataSource not found' });
    }
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
