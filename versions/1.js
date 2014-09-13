var models = require('../models');
var crypto = require('crypto');

/**
 * Get libraries filter by enabled
 */
module.exports.librariesAll = function(req, res) {
  models.libraries.find({enabled:true}, function(err, rows) {
    if (err) {
      res.json({error:{message:err}});
    }
    else {
      res.json(rows);
    }
  });
};

/**
 * Get entries by library_id
 */
module.exports.entries = function(req, res) {
  if (req.params.id) {
    models.entries.find({'library_id':req.params.id}, function(err, rows) {
      if (err) {
        res.json({error:{message:err}});
      }
      else {
        res.json(rows);
      }
    });
  }
  else {
    res.json({error:{message:'El ID res requerido'}});
  }
};

/**
 * Create entry
 */
module.exports.entriesCreate = function(req, res) {
  if (req.body.source === '') {
    res.json({error:{message:'El campo source es requerido'}});
  }
  else if (req.body.title === '') {
    res.json({error:{message:'El campo title es requerido'}});
  }
  else if (req.body.summary === '') {
    res.json({error:{message:'El campo summary es requerido'}});
  }
  else if (req.body.content === '') {
    res.json({error:{message:'El campo content es requerido'}});
  }
  else if (req.body.pubDate === '') {
    res.json({error:{message:'El campo pubDate es requerido'}});
  }

  var libraryId = req.params.id;
  var title = req.body.title;
  var summary = req.body.summary;
  var content = req.body.content;
  var pubDate = req.body.pubDate;
  var source = req.body.source;
  var hash = crypto.createHash('md5').update(source).digest('hex');

  models.entries.findOne({
    'library_id':libraryId,
    hash:hash
  },
  function(error, result) {
    if (error) {
      res.json({error:{message:error}});
    }
    else if (result) {
      res.json({error:{message:'Esta entrada ya existe'}});
    }
    else {
      var row = new models.entries;
      row.hash = hash;
      row['library_id'] = libraryId;
      row.title = title;
      row.summary = summary;
      row.content = content;
      row.pubDate = pubDate;
      row.source = source;
      row.save(function(err) {
        if (err) {
          res.json({error:{message:err}});
        }
        else {
          res.json({status:true});
        }
      });
    }
  });
}

/**
 * Check if entry exists
 */
module.exports.entriesExists = function(req, res) {
  var hash = req.params.hash;
  models.entries.findOne({
    hash:hash
  },
  function(error, result) {
    if (error) {
      res.json({error:{message:error}});
    }
    else if (result) {
      res.json({exists:true});
    }
    else {
      res.json({exists:false});
    }
  });
}
