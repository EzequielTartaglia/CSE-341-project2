const routes = require('express').Router();
const movieGendersController = require('../controllers/movie_gender.js');
const validation = require('../middleware/validate');

router.get('/', movieGendersController.getAll);

router.get('/:movie_gender_id', movieGendersController.getSingle);

router.post('/', validation.saveMovieGender, movieGendersController.createMovieGender);

router.put('/:movie_gender_id', validation.saveMovieGender, movieGendersController.updateMovieGender);

router.delete('/:movie_gender_id', movieGendersController.deleteMovieGender);

module.exports = routes;
