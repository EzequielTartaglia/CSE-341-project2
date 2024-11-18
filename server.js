const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const port = process.env.PORT || 3000;
const app = express();

// Set up the session middleware
app.use(
  session({
    secret: 'your-secret-key', // Asegúrate de cambiar esto por una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a `secure: true` si usas https
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub Strategy configuration
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'] // Permite obtener el email del usuario
    },
    (accessToken, refreshToken, profile, done) => {
      // Usualmente, almacenarías el perfil del usuario en la base de datos aquí
      return done(null, profile); // Serializa el perfil en la sesión
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user); // Guardar todo el perfil de usuario en la sesión
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user); // Recuperar el usuario completo desde la sesión
});

// GitHub OAuth routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub authentication callback route
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Si la autenticación es exitosa, redirige al usuario a '/api-docs'
    if (req.user && req.user.emails && req.user.emails.length > 0) {
      res.redirect('/api-docs');
    } else {
      res.send('Failed to retrieve email.');
    }
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    if (!err) {
      return res.send('Logout, successfully.');
    }
    res.redirect('/');
  });
});

// Use bodyParser and allow cross-origin requests
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Routes (can be defined in separate files)
app.use('/', require('./routes'));

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Initialize MongoDB and start the app
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
