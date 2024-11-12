const express = require('express');
const router = express.Router();

const movieGendersController = require('../controllers/movie_genders');
const validation = require('../middleware/validate');

router.get('/', movieGendersController.getAll);

router.get('/:id', movieGendersController.getSingle);

router.post('/', validation.saveMovieGender, movieGendersController.createMovieGender);

router.put('/:id', validation.saveMovieGender, movieGendersController.updateMovieGender);

router.delete('/:id', movieGendersController.deleteMovieGender);

module.exports = router;
