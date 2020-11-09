const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./_helpers/error.handler');
const createConnection = require('./db_helpers/connection');
require('dotenv').config();
const port = process.env.PORT;

app.use(cors());

// ! authentication middleware

app.use(createConnection);

console.log('Now the value for FOO is:', process.env.APP_ENV);

app.post('/users/authenticate', (req, res) => {
  res.send({ username: 'test' });
});

// * error Handler

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🎊 Server running at http://localhost:${port}`);
});
