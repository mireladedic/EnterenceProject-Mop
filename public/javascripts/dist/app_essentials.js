
'use strict';
var mopTwitter =  angular.module('mopTwitter', ['ngCookies', 'ngSanitize']);

// App Constants
mopTwitter.constant('APP_CONFIG', {
    apiUrl: 'http://localhost:8080/api/',
    name: 'mopTwitter'
});


/**
 * Created by Mirela on 2/26/2018.
 */
(function() {

    'use strict';

    mopTwitter.factory('RESTService', ['$http', 'APP_CONFIG', function($http, APP_CONFIG) {

        var apiUrl = APP_CONFIG.apiUrl;

        return {

            performRequest: function (url, method, body, headers, success, error) {

                $http({
                    url: apiUrl + url,
                    method: method,
                    data: body,
                    headers: headers
                }).then(function successCallback(response) {
                    if(response.status = 200) {
                        success(response);
                    }
                    else {
                        error(response);
                    }
                }, function errorCallback(err) {
                    error(err);
                })
            }

        }

    }]);

})();
