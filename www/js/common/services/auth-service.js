angular.module('starter').factory('AuthFactory', function($http, $localStorage, $state, baseUrl){
    var service = {};
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }
    function genericSuccess (res) {
      return res.data.data; // yes, really.
    }

    var currentUser = getUserFromToken();

    service.save = function(data, success, error) {
        return $http.post(baseUrl + '/api/user/signup', data)
    },
    service.signin = function(data, success, error) {
        return  $http.post(baseUrl + '/api/user/login', data)
    },
    service.me =  function(success, error) {
        return $http.get(baseUrl + '/api/me/')
    },
    service.logout =  function(success) {
        changeUser({});
        delete $localStorage.token;
    }
    return service;
});