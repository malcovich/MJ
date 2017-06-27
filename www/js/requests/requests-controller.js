angular.module('starter')
  .controller('RequestsListController', ['$scope', 'AuthFactory', '$http', '$stateParams','$state','$ionicModal',  function($scope, AuthFactory, $http, $stateParams, $state,  $ionicModal ){
  	var $ctrl = this;
    console.log('req', $state)
    var baseUrl = "https://salty-hamlet-53492.herokuapp.com";
    AuthFactory.me().then(function(res){
      $ctrl.user = res.data.data;
      if (!$ctrl.user){
        $state.go('main');
      }else {
     
        $ctrl.requestsList = [];
        $http.post(baseUrl + '/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
          $ctrl.requestsList = res.data;
        });

        $http.post(baseUrl + '/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
          $ctrl.friendsRequestsList = res.data;
        });
      }

      $ctrl.showModal = function(){
          $ionicModal.fromTemplateUrl('js/requests/addNew.html', {
            scope: $scope
          }).then(function(modal) {
            console.log(modal)
            $ctrl.modal = modal;
            $ctrl.modal.show();
          });
      }
    

    	$ctrl.save = function(){
  /*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
    		$ctrl.request.userId = $ctrl.user._id;
    		$ctrl.request.requestDate = new Date();
    		$http.post(baseUrl + '/api/requests/add', $ctrl.request).then(function(res){
  	      	$ctrl.requestsList.push(res)
  	    });
    	};

    	$ctrl.deleteRequest = function(id){
    		$http.post(baseUrl + '/api/requests/deleteRequest', {'requestId': id}).then(function(res){
          $ctrl.requestsList.forEach(function(item, k){
            if(item._id == id){
              $ctrl.requestsList.splice(k,1)
            }
          })
        });
    	};

    /*  $ctrl.change = function(request){
        ModalFactory.editRequest('myModalContent.html', 'ModalInstanceEditRequestCtrl',request).then(function(ctrl){
          console.log(ctrl.request)
        })
      };*/
    });
	
}]);


