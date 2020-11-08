const express = require('express');
const app = express();
const cors = require('cors');
const port = 3010;
const errorHandler = require('./_helpers/error.handler');
const createConnection = require('./db_helpers/connection');


app.use(cors());

app.use(createConnection);

// * error Handler
//app.use(errorHandler);

app.post('/users/authenticate', (req, res) => {
  res.send({ username: 'test' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
