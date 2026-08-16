const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({ status: 'CONNECTED', environment: process.env.APP_ENV, database_time: dbRes.rows.now });
  } catch (err) {
    res.status(500).json({ status: 'DATABASE_DISCONNECTED', error: err.message });
  }
});

app.post('/api/predict', (req, res) => {
  const { input_features } = req.body;
  const predictionResult = input_features ? input_features.reduce((a, b) => a + b, 0) * 1.414 : 0;
  res.json({ prediction: predictionResult, model_version: "v2.1.4-mock", compute_status: "SUCCESS" });
});

app.listen(5000, () => console.log('Mock API Engine active on 5000'));
