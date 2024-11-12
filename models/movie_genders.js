module.exports = (mongoose) => {
  const MovieGender = mongoose.model(
    'movie_genders',
    mongoose.Schema(
      {
        movie_gender_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true, unique: true }
      },
      { timestamps: true }
    )
  );

  return MovieGender;
};
