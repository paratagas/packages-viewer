const express = require('express');
const packagesData = require('./status.real.json');
const packagesDataDebug = require('./status.real.reduced.json');

const app = express();
const port = 8080;


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.use(express.static('dist'));

app.get('/packages', (request, response) => {
  response.json(packagesData);
});

app.get('/debug', (request, response) => {
  response.json(packagesDataDebug);
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${process.env.PORT || port}!`));
