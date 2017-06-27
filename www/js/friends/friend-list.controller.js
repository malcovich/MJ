angular.module('starter')
.controller('FriendsListController', ['$scope','$http','$state','AuthFactory', function($scope,  $http, $state,AuthFactory){
 var $ctrl = this;
 var baseUrl = "https://salty-hamlet-53492.herokuapp.com";
 AuthFactory.me().then(function(res){
  console.log(res)
  $ctrl.user = res.data.data;
  if (!$ctrl.user){
    $state.go('landing');
  }else {
    $ctrl.friendsList = [];
    $http.post(baseUrl + '/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
      $ctrl.friendsList = res.data;
      var userID = $ctrl.user._id;

      console.log("userid ", userID)

      var friendsList = [];

      for (var i = 0; i < $ctrl.friendsList.length; i++) {
        if ($ctrl.friendsList[i].useridaccept._id == userID) {
          friendsList.splice(i, 1, $ctrl.friendsList[i].useridinvite);
        } else {
          friendsList.splice(i, 1, $ctrl.friendsList[i].useridaccept);
        }
      }
      $ctrl.friendsList = friendsList;
    });
  }
})
}]);

