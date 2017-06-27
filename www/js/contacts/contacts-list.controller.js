angular.module('starter')
  .controller('ContactsListController', ['$scope', '$log', 'AuthFactory',  '$http','$state', function($scope, $log, AuthFactory,  $http, $state){
  	var $ctrl = this;
  	var baseUrl = "https://salty-hamlet-53492.herokuapp.com";
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
	  	if (!$ctrl.user){
	  		$state.go('app.main');
	  	}else {
	  		$ctrl.contactsList = [];
			$http.post(baseUrl + '/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
		      	$ctrl.contactsList = res.data;
		    });
		}
	});
}]);