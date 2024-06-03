
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const transactionRoutes = require('./routes/transactions.js');
const statisticsRoutes = require('./routes/statistics.js');
require('dotenv').config();

const app = express();
app.use(cors());
connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));

// Use routes from the separate folder
app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
