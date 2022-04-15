
const express = require('express');
const endpoints = require('./routes/endpoints');

const app = express();
const port = 3000;

endpoints(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
