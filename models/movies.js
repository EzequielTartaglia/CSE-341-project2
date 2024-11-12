const MovieGender = require('./movieGender'); 

module.exports = (mongoose) => {
  const Movie = mongoose.model(
    "movies",
    mongoose.Schema(
      {
        movie_id: { type: Number },
        title: { type: String, required: true, unique: true },
        description: { type: String },
        release_date: { type: Date, required: true },
        movie_gender_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MovieGender",
        },
        director_id: { type: Number, required: true },
        total_minutes: { type: Number, required: true },
      },
      { timestamps: true }
    )
  );

  return Movie;
};
