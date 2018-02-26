var express = require('express');
var router = express.Router();
var binder = require('model-binder');

/* GET home page. */
router.get('/tweets', binder(require('../models/tweetModel')), function(req, res, next) {

    req.requestModel.getTweets(function (success) {
        res.send(success);
    }, function (error) {
        res.render("error",{
            message: "Could not get Tweets!",
            error: error
        });
    });
});


router.post('/tweet', binder(require('../models/tweetModel')), function (req, res) {

  req.requestModel.createTweet(req.body.user, req.body.text, function (success) {
    res.send(success);
  }, function (error) {
     res.render("error",{
         message: "Could not create Tweet!",
         error: error
     });
  });

});

module.exports = router;
