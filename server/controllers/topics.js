var _ = require('lodash');
var Topics = require('../models/topics').Topics;


/**
 * List
 */
exports.all = function (req, res) {
  Topics.forge().fetch().then(function (topics) {
    res.json(topics);
  }).catch(function (err) {
    res.status(500).json(err);
  });
};

/**
 * Add a Topic
 */
exports.add = function (req, res) {
  Topics.forge().create(req.body)
    .then(function (result) {
      res.status(200).send('OK');
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).send(err);
    });
};

/**
 * Update a topic
 */
exports.update = function (req, res) {
  var query = {
    id: req.body.id
  };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _.omit(req.body, omitKeys);

  if (isFull) {
    Topics.findOneAndUpdate(query, data, function (err, data) {
      if (err) {
        console.log('Error on save!');
        res.status(500).send('We failed to save to due some reason');
      }
      res.status(200).send('Updated successfully');
    });
  } else {
    Topics.forge().query({where: {id: query.id}}).fetchOne()
    .then(function(topic){
      var nowCount = topic.attributes.count
      topic.save({count: isIncrement ? nowCount+1 : nowCount-1})
    }).then(function (topic) {
      res.status(200).send('Updated successfully');
    }).catch(function(err){
      console.log(err)
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save to due some reason');
    });
  }

};

/**
 *
 */
exports.increment = function (req, res) {
  var query = {
    id: req.body.id
  };

};

/**
 * Remove a topic
 */
exports.remove = function (req, res) {
  var query = {
    id: req.body.id
  };

  Topics.forge().query({where:{id: query.id}}).fetchOne()
  .then(function (topic) {
    topic.destroy()

		res.status(200).send('Removed Successfully');
	})
	.catch(function (err) {
    console.log(err);
	});

};
