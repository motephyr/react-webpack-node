var _ = require('lodash');
var Users = require('../models/user').Users;

var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      return res.status(401).send({msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
      return res.status(200).send('OK');
    });
  })(req, res, next);
};


/**
 * GET /logout
 */
exports.getLogout = function(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };

  Users.forge().query({where: {email: req.body.email}}).fetchOne()
  .then(function(existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
    }
    Users.forge().create(user).then(function(user) {

      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.end('Success');
      });
    }).catch(function(err){
      return next(err);
    });
  });
};
