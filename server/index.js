const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const PORT = 4000;

app.use(express.json());

// const movies = [
//   { title: 'Mean Girls' },
//   { title: 'Hackers' },
//   { title: 'The Grey' },
//   { title: 'Sunshine' },
//   { title: 'Ex Machina' },
// ];

// app.get('/movies', (req, res) => {
//   res.json(movies);
// });

app.get('/', (req, res) => {
    res.send('Welcome to the Movie List API!');
  });
  
// Setup connection to PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

// Endpoint to fetch movies from PostgreSQL database
app.get('/movies', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM movies');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

