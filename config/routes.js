/** External Dependencies */
const bodyParser = require('body-parser');
const express = require('express');

/** Internal Dependencies */
const {info} = require('../endpoints/info');

/** Initialize Express App */
const app = express();

/** Use the bodyParser Plugin */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** Define the Routes */
app.get('/info', info);
app.get('/', (req, res) => {
  res.redirect('/info');
});

module.exports = app
