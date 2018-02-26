
var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../config.json').mongoDb;
var url = "mongodb://"+ mongoConfig.host + ":" + mongoConfig.port  + "/" + mongoConfig.database;

function tweetModel() {

    this.createTweet = function( user, text, success, error ) {

        return MongoClient.connect(url, function(err, db) {
            if (err) { error(err); return; }
            var dbo = db.db(mongoConfig.database);
            var myobj = { user: user, text: text, created: new Date() };
            return dbo.collection(mongoConfig.collection).insertOne(myobj, function(err, res) {
                if (err) {error(err); return;}
                success(res);
                db.close();
            });
        });
    };
    this.getTweets = function( success, error ) {

        return MongoClient.connect(url, function(err, client) {
            if(err) {
                error(err);
                return;
            }
            const db = client.db(mongoConfig.database);
            const collection = db.collection(mongoConfig.collection);
            collection.find({}).toArray(function(err, docs) {

                success(docs);
            });
        });
    }
}

module.exports = tweetModel;