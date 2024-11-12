const routes = require('express').Router();
const moviesController = require('../controllers/movie.js');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:movie_id', moviesController.getSingle);

router.post('/', validation.saveMovie, moviesController.createMovie);

router.put('/:movie_id', validation.saveMovie, moviesController.updateMovie);

router.delete('/:movie_id', moviesController.deleteMovie);

module.exports = routes;
