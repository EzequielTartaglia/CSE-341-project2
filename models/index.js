const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movies = require('./movies.js')(mongoose);
db.movie_genders = require('./movie_genders.js')(mongoose);

module.exports = db;
