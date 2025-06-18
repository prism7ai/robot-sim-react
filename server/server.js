require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://robot-sim-react.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// PostgreSQL connection via Railway or local .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Save path to DB
app.post('/save-path', async (req, res) => {
  const { algorithm, start, goal, obstacles, path, visitedCount, pathLength, timeTaken } = req.body;

  const sql = `
    INSERT INTO paths_new (
      algorithm,
      start_point,
      goal_point,
      obstacles,
      path,
      visited_count,
      path_length,
      time_taken
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  try {
    await pool.query(sql, [
      algorithm,
      JSON.stringify(start),
      JSON.stringify(goal),
      JSON.stringify(obstacles),
      JSON.stringify(path),
      visitedCount,
      pathLength,
      timeTaken
    ]);
    res.send({ message: '✅ Saved to Postgres' });
  } catch (err) {
    console.error('❌ Insert failed:', err.message);
    res.status(500).send('Insert failed');
  }
});

// Get recent paths
app.get('/results', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM paths_new ORDER BY id DESC LIMIT 10`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Fetch failed:', err.message);
    res.status(500).send('Fetch failed');
  }
});

// Port for Railway or localhost
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
