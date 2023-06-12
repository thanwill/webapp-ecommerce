const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const User = require('../models/usuario');

// Configurar as credenciais do OAuth
const GOOGLE_CLIENT_ID = "271487050068-e1j8t5epi97q8tkmhcd463tgeu2g9367.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// Configurar a estratégia de autenticação
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://tancy:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
