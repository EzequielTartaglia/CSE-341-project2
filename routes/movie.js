const routes = require('express').Router();
const movies = require('../controllers/movie.js');

routes.get('/', movies.findAll);
routes.get('/:movie_id', movies.findOne);

routes.post('/', movies.create);

routes.put('/:movie_id', movies.update);

routes.delete('/:movie_id', movies.delete)

module.exports = routes;
