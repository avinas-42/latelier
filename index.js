
const express = require('express');
const endpoints = require('./routes/endpoints');

const app = express();
const port = process.env.PORT || 5000

process.env.DATAFILENAME = 'headtohead.json';

module.exports = app

// call routes
endpoints(app);

//start express server
app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
