module.exports = (mongoose) => {
  const Movie = mongoose.model(
    'movies',
    mongoose.Schema(
      {
        movie_id: { type: Number },
        title: { type: String, required: true, unique: true },
        description: { type: String },
        release_date: { type: Date, required: true },
        movie_gender_id: { type: String, required: true },
        director_id: { type: String, required: true },
        total_minutes: { type: Date, required: true },
      },
      { timestamps: true }
    )
  );

  return Movie;
};
