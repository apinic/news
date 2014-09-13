var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var versions = require('./versions');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.set('json spaces', 2);

app.get('/v1/library/all', versions['1'].librariesAll);
app.get('/v1/entries/:id', versions['1'].entries);
app.post('/v1/entries/:id/create', versions['1'].entriesCreate);
app.get('/v1/entries/:hash/exists', versions['1'].entriesExists);

app.get('*', function(req, res) {
  res.status(404).json({error:{message:'Recurso no encontrado.'}});
});

app.listen(process.env.PORT || 5000);
