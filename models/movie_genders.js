module.exports = (mongoose) => {
  const MovieGender = mongoose.model(
    'movie_genders',
    mongoose.Schema(
      {
        name: { type: String, required: true, unique: true }
      },
      { timestamps: true }
    )
  );

  return MovieGender;
};
