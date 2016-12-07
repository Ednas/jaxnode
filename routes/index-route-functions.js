'use strict';
/*
 * GET home page.
 */

exports.index = function index(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            console.log('problem with meetup request: ' + err);
            res.status(500).render('error', {
                message: 'No app exists',
                error: {
                    status: '500',
                    stack: 'App Error'
                }
            });
        } else {
            var meetingArray = results;
            req.service.getTweets(function cb(err2, tweetResults) {
                if (err2) {
                    console.log('problem with twitter request: ' + err2);
                    res.status(500).render('error', {
                        message: 'No tweets',
                        error: {
                            status: '500',
                            stack: 'App Twitter Error'
                        }
                    });
                } else {
                    if (meetingArray) {
                        var displayMeetup = Object.keys(meetingArray).length !== 0;
                        if (displayMeetup && meetingArray.hasOwnProperty('venue')) {
                            var displayMap = Object.keys(meetingArray.venue).length !== 0;
                        }
                    }
                    var displayTweets = tweetResults.tweets.length !== 0;
                    res.render('index', {
                        title: 'JaxNode User Group',
                        meeting: meetingArray,
                        tweets: tweetResults.tweets,
                        displayMeetup: displayMeetup,
                        displayMap: displayMap,
                        displayTweets: displayTweets
                    });
                }
            });
        }
    });
};

exports.code = function code(req, res) {
    req.getCode(function callback(err, results) {
        if (err) {
            console.log('problem with request: ' + err);
            res.status(500).render('error', {
                message: 'problem with request',
                error: {
                    status: '500',
                    stack: 'problem with request'
                }
            });
        } else {
            console.log(results.repos);
            res.render('code', { title: 'Jax Node GitHub code', repos: results.repos });
        }
    });
};

exports.api = function api(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            console.log('problem with request: ' + err);
            res.status(500).send({ meeting: 'Error occured' });
        } else {
            res.send({ meeting: results });
        }
    });
};
