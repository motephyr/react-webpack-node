/**
 * Schema Definitions
 *
 */
var Bookshelf = require('./base');

var Topic = Bookshelf.Model.extend({
  tableName: "topics"
});

Topics = Bookshelf.Collection.extend({
    model: Topic
});

module.exports = {
  Topic: Bookshelf.model('Topic', Topic),
  Topics: Bookshelf.collection('Topics', Topics)
}
