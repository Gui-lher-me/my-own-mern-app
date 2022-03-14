const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const logger = require('./middlewares/logger');
const users = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/users', users);

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
