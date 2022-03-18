// imports
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// env variables
dotenv.config();

// connect to db
const { connect, connection } = mongoose;
const uri = process.env.ATLAS_URI;
connect(uri, {})
  .then((res) => console.log(res.connection.host))
  .catch((error) => console.log(error));
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// express init
const app = express();

// port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// listen
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
