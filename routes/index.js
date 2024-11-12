const routes = require('express').Router();

routes.use('/movies', require('./movie'));
routes.use('/movie_genders', require('./movie_gender'));

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
