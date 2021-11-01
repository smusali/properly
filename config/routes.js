/** External Dependencies */
const bodyParser = require('body-parser');
const express = require('express');

/** Internal Dependencies */
const info = require('../endpoints/info');
const listings = require('../endpoints/listings');

/** Initialize Express App */
const app = express();

/** Use the bodyParser Plugin */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** Define the Routes */
app.get('/listings', listings.list);
app.get('/listings/:type', listings.list);
app.post('/listings/:type', listings.create);
app.get('/listings/:type/:id', listings.retrieve);
app.put('/listings/:type/:id', listings.update);
app.delete('/listings/:type/:id', listings.remove);
app.get('/info', info.info);
app.get('/', (req, res) => {
  res.redirect('/info');
});

module.exports = app;
