angular.module('starter')
  .controller('ConfirmeController', ['$scope', '$http', '$stateParams','$state','$rootScope', '$location', '$localStorage', 'AuthFactory', '$ionicHistory', 'baseUrl',function($scope, $http, $stateParams, $state,$rootScope ,$location,$localStorage, AuthFactory, $ionicHistory, baseUrl){
    $scope.$on('$ionicView.enter', function(e) {
      AuthFactory.me().then(function(user){
        $scope.user = user.data.data;
      });
    })
  
    $scope.saveNumber = function(){
      $http.post(baseUrl + '/api/user/updateProfile', {_id : $scope.user._id, phone: $scope.phoneNumber, hardNumber: true}).then(function(res){
        $state.go("app.main"); 
      });
    };

    $scope.skipNumber = function(){
      $state.go("usercontacts");   
    };
}]);