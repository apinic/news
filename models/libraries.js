exports.setup = function(_mongoose, _db) {
  var fileName = require('path').basename(__filename, '.js');

  var schema = _mongoose.Schema({
    'name': String,
    'icon_url': String,
    'enabled': Boolean,
    'created_at': {
      'type': Date,
      'default': Date.now
    }
  });

  _db.model(fileName, schema);

  var data = _db.model(fileName);

  return data;
};
