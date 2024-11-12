const db = require("../models");
const Movie = db.movies;

const apiKey = process.env.SWAGGER_API_KEY;

exports.create = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Movie gender name can not be empty!" });
    return;
  }
 

  // Create a MovieGender
  const movieGender = new MovieGender({
    movie_gender_id: req.body.movie_gender_id,
    name: req.body.name,
  });

  // Save MovieGender in the database
  movieGender
    .save(movieGender)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MovieGender.",
      });
    });
};

exports.findAll = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Movie.find(
      {},
      {
        movie_gender_id: 1,
        name: 1,
        }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving movie genders.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Find a single Movie by movie_id
exports.findOne = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  const movie_gender_id = req.params.movie_gender_id;
  if (req.header("apiKey") === apiKey) {
    Contact.findOne({ _id: movie_gender_id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found MovieGender with movie_gender_id " + movie_gender_id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving MovieGender with movie_gender_id=" + movie_gender_id,
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const movie_gender_id = req.params.movie_gender_id;

  // API Key validation
  if (req.header("apiKey") === apiKey) {
    // Create an object with the fields that need to be updated
    const updateFields = {};

    // Check which fields are present in the request body and add them to updateFields
    if (req.body.name) updateFields.title = req.body.name;

    // If there are no fields to update, return a 400 error
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({
        message: "At least one field must be provided to update.",
      });
    }

    // Update the movie with the specified fields
    Movie.findByIdAndUpdate(movie_id, updateFields, {
      new: true,
      useFindAndModify: false,
    })
      .then((updatedMovieGender) => {
        if (!updatedMovieGender) {
          res.status(404).send({
            message: `Cannot update movie gender with movie_gender_id=${movie_gender_id}. Maybe MovieGender was not found!`,
          });
        } else {
          res.send(updatedMovieGender);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating MovieGender with movie_gender_id=" + movie_gender_id,
        });
      });
  } else {
    res.status(403).send({
      message: "Invalid API Key",
    });
  }
};


// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  if (!req.body) {
    return res.status(400).send({
      message: "Data to delete cannot be empty!",
    });
  }

  const movie_gender_id = req.params.movie_gender_id;

  // API Key
  if (req.header("apiKey") === apiKey) {
    Movie.findByIdAndRemove(movie_gender_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete MovieGender with movie_gender_id=${movie_gender_id}. Maybe MovieGender was not found!`,
          });
        } else {
          res.send({
            message: "MovieGender was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete MovieGender with movie_gender_id=" + movie_gender_id,
        });
      });
  }
};
