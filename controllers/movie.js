const db = require("../models");
const Movie = db.movies;

const apiKey = process.env.SWAGGER_API_KEY;

exports.create = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */

  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  if (!req.body.movie_gender_id) {
    res.status(400).send({ message: "movie_gender_id can not be empty!" });
    return;
  }
  if (!req.body.director_id) {
    res.status(400).send({ message: "director_id can not be empty!" });
    return;
  }
  if (!req.body.total_minutes) {
    res.status(400).send({ message: "total_minutes can not be empty!" });
    return;
  }

  if (!req.body.release_date) {
    res.status(400).send({ message: "release_date can not be empty!" });
    return;
  }

  // Create a Movie
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    movie_gender_id: req.body.movie_gender_id,
    director_id: req.body.director_id,
    total_minutes: req.body.total_minutes,
  });

  // Save Movie in the database
  movie
    .save(movie)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Movie.",
      });
    });
};

exports.findAll = (req, res) => {
  /*
    #swagger.description = 'Api key needed -> Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Movie.find({})
      .populate("movie_gender_id", "name")  
      .then((data) => {
        const mappedData = data.map((movie) => ({
          ...movie.toObject(),
          gender_name_fk: movie.movie_gender_id ? movie.movie_gender_id.name : null,
        }));
        
        res.send(mappedData);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving movies.",
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

  const movie_id = req.params.movie_id;
  if (req.header("apiKey") === apiKey) {
    Movie.findOne({ _id: movie_id })
      .populate("movie_gender_id", "name")
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found Movie with movie_id " + movie_id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Movie with movie_id=" + movie_id,
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

  const movie_id = req.params.movie_id;

  // API Key validation
  if (req.header("apiKey") === apiKey) {
    // Create an object with the fields that need to be updated
    const updateFields = {};

    // Check which fields are present in the request body and add them to updateFields
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.description) updateFields.lastName = req.body.description;
    if (req.body.movie_gender_id)
      updateFields.movie_gender_id = req.body.movie_gender_id;
    if (req.body.director_id) updateFields.director_id = req.body.director_id;
    if (req.body.total_minutes)
      updateFields.total_minutes = req.body.total_minutes;
    if (req.body.release_date)
      updateFields.release_date = req.body.release_date;

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
      .then((updatedMovie) => {
        if (!updatedMovie) {
          res.status(404).send({
            message: `Cannot update movie with movie_id=${movie_id}. Maybe Movie was not found!`,
          });
        } else {
          res.send(updatedMovie);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Movie with movie_id=" + movie_id,
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

  const movie_id = req.params.movie_id;

  // API Key
  if (req.header("apiKey") === apiKey) {
    Movie.findByIdAndRemove(movie_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Movie with movie_id=${movie_id}. Maybe Movie was not found!`,
          });
        } else {
          res.send({
            message: "Movie was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Movie with movie_id=" + movie_id,
        });
      });
  }
};

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };
