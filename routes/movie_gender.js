const routes = require('express').Router();
const movie_genders = require('../controllers/movie_gender.js');

routes.get('/', movie_genders.findAll);
routes.get('/:movie_gender_id', movie_genders.findOne);

routes.post('/', movie_genders.create);

routes.put('/:movie_gender_id', movie_genders.update);

routes.delete('/:movie_gender_id', movie_genders.delete)

module.exports = routes;
