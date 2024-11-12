const routes = require('express').Router();
const movie = require('./movie');
const movie_gender = require('./movie_gender');

routes.use('/movies', movie);
routes.use('/movie_gender', movie_gender);

routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
