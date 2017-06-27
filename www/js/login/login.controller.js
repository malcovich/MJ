angular.module('starter')
  .controller('LoginController', ['$scope', '$http', '$stateParams','$state','$rootScope', '$location', '$localStorage', 'AuthFactory', '$ionicHistory', 'baseUrl', 'ContactsService', function($scope, $http, $stateParams, $state,$rootScope ,$location,$localStorage, AuthFactory, $ionicHistory, baseUrl, ContactsService){
    $scope.loginData = {};
	  $scope.newUser = {};

    $scope.doLogin = function() {
      AuthFactory.signin( $scope.loginData).then(function(res){
        if (res.data.type == false) {
            alert(res.data)    
        } else {
          $localStorage.token = res.data.token;
          AuthFactory.me().then(function(user){
            $scope.user = user.data.data;
            if($scope.user.hardNumber == true){
              $state.go("app.main");    
            }else {
              $state.go("hardnumber"); 
            }
          })
        }
      });
    };

    $scope.signup = function(){
      var formData = {
        email: $scope.newUser.email,
        password: $scope.newUser.password,
        role : 'customer'
      }
      AuthFactory.save( formData).then(function(res){
        if(res.data.type){
          $localStorage.token = res.data.token;
          $state.go("hardnumber"); 
        }
      });
    }


}]);