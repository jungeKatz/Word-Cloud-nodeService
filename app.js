const express = require('express');
const app = express();
var cors = require('cors');
const port = 4000;

app.use(cors());

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
app.use(myLogger);

app.post('/users/authenticate', (req, res) => {
  res.send({ username: 'test' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
