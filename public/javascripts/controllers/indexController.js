(function() {

    'use strict';

    mopTwitter.controller('indexController', ['$scope', '$window', '$http', 'APP_CONFIG', '$cookies', '$rootScope', 'RESTService', function($scope, $window, $http, APP_CONFIG, $cookies, $rootScope, RESTService) {

        $scope.username = $cookies.get("username") || "JohnDoe";
        $scope.userName = $cookies.get("userName") || "John Doe";
        $scope.error = '';
        $cookies.put("username", $scope.username);
        $scope.tweetList = [];
        $scope.tweet = '';

        $scope.createTweet = function () {

            if($scope.username === '') {
                $scope.tweet = '';
                $scope.error = 'The username is empty!';
                return;
            }
            if($scope.tweet === '') {
                $scope.error = 'The tweet is empty!';
                return;
            }

            RESTService.performRequest('tweet', 'POST', {
                text: $scope.tweet,
                user: $scope.username
            }, {
                'Username' : $scope.username,
                'Content-Type' : 'application/json'

            }, function (response) {
                $scope.tweetList.unshift({
                    text: $scope.tweet,
                    user: $scope.username,
                    created: new Date()
                });
                $scope.tweet = '';
            }, function (error) {
                alert("Could not create tweet!");
            });



        };

        $scope.getTweets = function () {
            RESTService.performRequest('tweets', 'GET', null, {
                'Username' : $scope.username

            }, function (response) {
                $scope.tweetList = response.data;
                console.log(response);
            }, function (error) {
                alert("Could not create tweet!");
            });
        };

        $scope.$watch('username', function(newValue, oldValue) {

            if(newValue !== oldValue) {
                $cookies.put("username", newValue);
            }
            if(newValue !== '') {
                $scope.error = '';
            }
        });

        $scope.$watch('userName', function(newValue, oldValue) {

            if(newValue !== oldValue) {
                $cookies.put("userName", newValue);
            }
            if(newValue !== '') {
                $scope.error = '';
            }
        });



    }]);

})();
