angular.module('starter')
  .controller('MainController', ['$scope','AuthFactory','$http','$stateParams','$ionicModal','baseUrl', function($scope, AuthFactory, $http, $stateParams, $ionicModal, baseUrl){
    var $ctrl = this;
    AuthFactory.me().then(function(res){
      $ctrl.user = res.data.data;
      
    });
}]);

