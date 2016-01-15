/* Initializing passport.js */
var Users = require('../models/user').Users;
var local = require('./passport/local');
var google = require('./passport/google');

/*
 * Expose
 */
module.exports = function(app, passport, config) {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    Users.forge().query({where:{id:id}}).fetchOne().then(function(user) {
      done(null, user);
    });
  });

  //use the following strategies
  passport.use(local);
  passport.use(google);
};
