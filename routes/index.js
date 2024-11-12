const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/movies', require('./movies'));
routes.use('/movie_genders', require('./movie_genders'));

module.exports = routes;
