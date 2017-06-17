var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  full_name: String,
  id: Number,
  url: String,
  description: String,
  private: Boolean
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
