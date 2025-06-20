require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to Railway MySQL');
  }
});

app.post('/save-path', (req, res) => {
  const { algorithm, start, goal, obstacles, path, visitedCount, pathLength, timeTaken } = req.body;

  const sql = `
    INSERT INTO paths
    (algorithm, start_point, goal_point, obstacles, path, visited_count, path_length, time_taken)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    algorithm,
    JSON.stringify(start),
    JSON.stringify(goal),
    JSON.stringify(obstacles),
    JSON.stringify(path),
    visitedCount,
    pathLength,
    timeTaken
  ], (err) => {
    if (err) {
      console.error('❌ Insert failed:', err);
      res.status(500).send('Insert failed');
    } else {
      res.send({ message: '✅ Saved successfully' });
    }
  });
});

app.get('/results', (req, res) => {
  const sql = `SELECT * FROM paths ORDER BY id DESC LIMIT 10`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Fetch failed:', err);
      res.status(500).send('Error fetching results');
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
