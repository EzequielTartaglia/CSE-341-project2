const validator = require("../helpers/validate");

//Movie 
const saveMovie = (req, res, next) => {
  const validationRule = {
    title: "title|string|unique",
    description: "string",
    release_date: "date|email",
    movie_gender_id: "required|number",
    director_id: "required|number",
    total_minutes: "required|number",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

//MovieGender
const saveMovieGender = (req, res, next) => {
  const validationRule = {
    name: "title|string|unique",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovie,
  saveMovieGender,
};
