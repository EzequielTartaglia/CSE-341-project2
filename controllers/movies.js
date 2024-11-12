const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('movies')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movies id to find a movies.');
  }
  const movieId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('movies')
    .find({ _id: movieId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createMovie = async (req, res) => {
  const movie = {
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    movie_gender_id: req.body.movie_gender_id,
    director_id: req.body.director_id,
    total_minutes: req.body.total_minutes    
  };
  const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the movie.');
  }
};

const updateMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to update a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const movie = {
    title: req.body.title,
    description: req.body.description,
    release_date: req.body.release_date,
    movie_gender_id: req.body.movie_gender_id,
    director_id: req.body.director_id,
    total_minutes: req.body.total_minutes    
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('movies')
    .replaceOne({ _id: movieId }, movie);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
};

const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to delete a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('movies').remove({ _id: movieId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};
