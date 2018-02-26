
'use strict';
var mopTwitter =  angular.module('mopTwitter', ['ngCookies', 'ngSanitize']);

// App Constants
mopTwitter.constant('APP_CONFIG', {
    apiUrl: 'http://localhost:8080/api/',
    name: 'mopTwitter'
});

