const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.use(cors());
app.use(express.json());

app.get('/api/word', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM words WHERE date = CURRENT_DATE');
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('No word found for today');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/word', async (req, res) => {
  try {
    const { word, definition } = req.body;
    const newWord = await pool.query(
      'INSERT INTO words (word, definition) VALUES ($1, $2) RETURNING *',
      [word, definition]
    );
    res.json(newWord.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});