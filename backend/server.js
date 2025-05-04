const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'entries.json');

app.use(cors());
app.use(express.json());

// Helper to read entries from JSON file
function readEntries() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to write entries to JSON file
function writeEntries(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

// GET /entries - get all manual entries
app.get('/entries', (req, res) => {
  const entries = readEntries();
  res.json(entries);
});

// POST /entries - add a new manual entry
app.post('/entries', (req, res) => {
  const entries = readEntries();
  const newEntry = { id: uuidv4(), ...req.body };
  entries.push(newEntry);
  writeEntries(entries);
  res.status(201).json(newEntry);
});

// PUT /entries/:id - update an existing entry
app.put('/entries/:id', (req, res) => {
  const entries = readEntries();
  const index = entries.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  entries[index] = { ...entries[index], ...req.body };
  writeEntries(entries);
  res.json(entries[index]);
});

// DELETE /entries/:id - delete an entry
app.delete('/entries/:id', (req, res) => {
  let entries = readEntries();
  const index = entries.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  entries = entries.filter(e => e.id !== req.params.id);
  writeEntries(entries);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
