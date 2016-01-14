/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
var Bookshelf = require('./base');

var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var User = Bookshelf.Model.extend({
  tableName: "users",
  initialize: function () {
    this.on('saving', this.beforeSave);
  },
  beforeSave: function () {
    return Promise.all([
      this.buildSalt()
    ]);
  },
  buildSalt: function () {
    if (this.get('password')) {
      return this.generatePasswordHash();
    }
    return Promise.resolve().bind(this);
  },
  //generates a promise which is resolved when the user's salt is generated
  getSalt: function () {
    return this.generateSalt().bind(this).then(function (salt) {
      this.set('salt', this.get('salt') || salt);
      return this.get('salt');
    });
  },
  //returns a promise for the salt
  generateSalt: function () {
    return bcrypt.genSaltAsync(8);
  },
  //returns a promise for the password hash
  generatePasswordHash: function () {
    return this.getSalt()
      .bind(this)
      .then(function (salt) {
        return bcrypt.hashAsync(this.get('password'), salt, null);
      })
      .then(function (hash) {
        this.set('password_hash', hash);
        this.unset('password');
        return this;
      });
  },
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err,
      isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    })
  }

});

var Users = Bookshelf.Collection.extend({
    model: User
});

module.exports = {
  User: Bookshelf.model('User', User),
  Users: Bookshelf.collection('Users', Users)
}
