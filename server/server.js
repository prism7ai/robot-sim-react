require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({
  origin: 'https://robot-sim-react.vercel.app',
  methods: ['GET', 'POST']
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post('/save-path', async (req, res) => {
  const { algorithm, start, goal, obstacles, path, visitedCount, pathLength, timeTaken } = req.body;

  const sql = `
    INSERT INTO paths_new 
    (algorithm, start_point, goal_point, obstacles, path, visited_count, path_length, time_taken)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
    res.send({ message: '✅ Saved to PostgreSQL' });
  } catch (err) {
    console.error('❌ Insert failed:', err);
    res.status(500).send('Insert failed');
  }
});

app.get('/results', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM paths_new ORDER BY id DESC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Fetch failed:', err);
    res.status(500).send('Fetch failed');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
