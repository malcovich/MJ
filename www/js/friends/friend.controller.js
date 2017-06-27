angular.module('starter')
  .controller('FriendController', ['$scope', '$log', 'AuthFactory', '$http',  '$stateParams', function($scope, $log, AuthFactory, $http, $stateParams){
  	var $ctrl = this;
  	var baseUrl = "https://salty-hamlet-53492.herokuapp.com";
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
		$http.post('/api/friend/item', { 'id': $stateParams.id}).then(function(res){
	      	$ctrl.friend = res.data.friend[0];
	      	$ctrl.constacts = res.data.contacts;
	      });
	});
}]);

