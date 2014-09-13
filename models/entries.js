exports.setup = function(_mongoose, _db) {

  var fileName = require('path').basename(__filename, '.js');

  var schema = _mongoose.Schema({
    'hash': {
      'type': String,
      'index': {
        'unique': true
      }
    },
    'library_id': String,
    'title': String,
    'summary': String,
    'content': String,
    'pubDate': String,
    'source': String,
    'image': String,
    'created_at': {
      'type': Date,
      'default': Date.now
    }
  });

  _db.model(fileName, schema);

  var data = _db.model(fileName);

  return data;
};
