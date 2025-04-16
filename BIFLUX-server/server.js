const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const clickhouseRoutes = require('./router/clickhouse');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/clickhouse', clickhouseRoutes);

app.get('/', (req, res) => {
  res.send('BIFLUX backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
