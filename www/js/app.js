// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngStorage', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*.constant('baseUrl', "https://salty-hamlet-53492.herokuapp.com")*/
.constant('baseUrl', "http://172.18.2.117:5000")

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainController',
          controllerAs: '$ctrl'
        }
      }
    })
   .state('app.friends', {
      url: '/friends',
      views: {
        'menuContent': {
          templateUrl: 'templates/friends.html',
          controller: 'FriendsListController',
          controllerAs: '$ctrl'
        }
      }
    })
     .state('app.requests', {
      url: '/requests',
      views: {
        'menuContent': {
          templateUrl: 'js/requests/list.html',
          controller: 'RequestsListController',
          controllerAs: '$ctrl'
        }
      }
    })
   .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'js/contacts/list.html',
          controller: 'ContactsListController',
          controllerAs: '$ctrl'
        }
      }
    })
   .state('login', {
      url: '/login',
      templateUrl: 'js/login/login.html',
      controller: 'LoginController'
    })
   .state('signup', {
      url: '/signup',
      templateUrl: 'js/login/sign-up.html',
      controller: 'LoginController'
    })
    .state('usercontacts', {
      url: '/usercontacts',
      templateUrl: 'js/login/usercontacts.html',
      controller: 'UserContactsController'
    })
   .state('hardnumber', {
      url: '/hardnumber',
      cache: false,
      templateUrl: 'templates/modals/confirmeNumber.html',
      controller: 'ConfirmeController'
    })
 
   .state('app.request', {
      url: 'requests/:reqId',
      views: {
        'menuContent': {
          templateUrl: 'js/requests/request.html',
          controller: 'RequestController',
          controllerAs: '$ctrl'
        }
      }
    })
   .state('app.contact', {
      url: '/contact/:id',
      views: {
        'menuContent': {
          templateUrl: 'js/contacts/contact-details.html',
          controller: 'ContactDetailsController',
          controllerAs: '$ctrl'
        }
      }
    })
   .state('app.friend', {
      url: '/friend/:id',
      views: {
        'menuContent': {
          templateUrl: 'js/friends/item.html',
          controller: 'FriendsListController',
          controllerAs: '$ctrl'
        }
      }
    })
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
  $ionicConfigProvider.tabs.position('bottom');
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
              return {
                  'request': function (config) {
                      config.headers = config.headers || {};
                      if ($localStorage.token) {
                          config.headers.Authorization = 'Bearer ' + $localStorage.token;
                      }
                      return config;
                  },
                  'responseError': function(response) {
                      if(response.status === 401 || response.status === 403) {
                          $location.path('/login');
                      }
                      return $q.reject(response);
                  }
              };
          }]);
});
