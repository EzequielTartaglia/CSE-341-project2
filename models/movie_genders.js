module.exports = (mongoose) => {
  const MovieGender = mongoose.model(
    'MovieGender', // Cambiar a 'MovieGender' para que coincida con el ref en el modelo de Movie
    mongoose.Schema(
      {
        name: { type: String, required: true, unique: true }
      },
      { timestamps: true }
    )
  );

  return MovieGender;
};
