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

app.get('*', function(req, res) {
  res.status(404).json({error:{message:'Recurso no encontrado.'}});
});

app.listen(process.env.PORT || 5000);