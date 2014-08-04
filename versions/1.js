var models = require('../models');

module.exports.librariesAll = function(req, res) {

  models.libraries.find({}, function(err, rows) {

    if (err) {

      res.json({error:{message:err}});

    }
    else {

      res.json(rows);

    }

  });

};
