/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
var Bookshelf = require('./base');

var bcrypt = require('bcrypt');
var crypto = require('crypto');

var User = Bookshelf.Model.extend({
  tableName: "users",
  initialize: function () {
    this.on('creating', this.hashPassword, this);
  },
  hashPassword: function (model, attrs, options) {
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(model.attributes.password, salt, function (err, hash) {
          if (err) reject(err);
          model.set('password', hash);
          resolve(hash); // data is created only after this occurs
        });
      });
    });
  },
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.attributes.password, function (err,
      isMatch) {
        console.log(isMatch)
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
