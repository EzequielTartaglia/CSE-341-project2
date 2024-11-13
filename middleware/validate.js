const validator = require("../helpers/validate");

const saveMovie = (req, res, next) => {
  const isUpdate = req.method === "PUT";

  const validationRule = {
    title: isUpdate ? "string|nullable" : "required|string",
    description: isUpdate ? "string|nullable" : "required|string",
    release_date: isUpdate ? "date|nullable" : "required|date",
    movie_gender_id: isUpdate ? "integer|nullable" : "required|integer",
    director_id: isUpdate ? "integer|nullable" : "required|integer",
    total_minutes: isUpdate ? "integer|nullable" : "required|integer",
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

const saveMovieGender = (req, res, next) => {
  const isUpdate = req.method === "PUT";

  const validationRule = {
    movie_gender_id: isUpdate ? "integer|nullable" : "required|integer",
    name: isUpdate ? "string|nullable" : "required|string",
    description: isUpdate ? "string|nullable" : "required|string",
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
