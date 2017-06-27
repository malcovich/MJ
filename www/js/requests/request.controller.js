angular.module('starter')
  .controller('RequestController', ['$scope', '$log', 'AuthFactory',  '$http', '$stateParams', '$ionicModal',  function($scope, $log, AuthFactory, $http, $stateParams,$ionicModal){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];
    /*id =591c7028ad30f137f06c8559*/
    var baseUrl = "https://salty-hamlet-53492.herokuapp.com";
  	AuthFactory.me().then(function(res){
      $ctrl.user = res.data.data;
      $http.post(baseUrl +'/api/requests/item', {'reqId': $stateParams.reqId}).then(function(res){
          $ctrl.request = res.data[0];
          if($ctrl.user._id == $ctrl.request.userId){
            $http.post(baseUrl +'/api/requests/getAllAnswers', {'reqId': $stateParams.reqId}).then(function(res){
                $ctrl.allAnswers = res.data;
            }); 
          }
      });

      $http.post(baseUrl + '/api/contact/all',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
         $ctrl.data = res.data;
            $ctrl.allContatcts = [];
            console.log(res.data)
            for(i in $ctrl.data){
              console.log('sdfdsf',i, $ctrl.data[i][0].userId[0].name)
              var friend = $ctrl.data[i][0].userId[0].name
              if ($ctrl.data[i][0].userId[0]._id == $ctrl.user._id){
                 $ctrl.allContatcts.push({title: 'Ваши професионалы', contacts : $ctrl.data[i]})
              }
              else {
                $ctrl.allContatcts.push({friend: $ctrl.data[i]})
              }
            }
           $http.post(baseUrl + '/api/requests/getAnswer',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
            $ctrl.myAnswer = res.data;
            $ctrl.selectedContacts = res.data[0] ? res.data[0].contacts: [];
            $ctrl.selectedContacts.forEach(function(contact){
              $ctrl.allContatcts.forEach(function(item){
                item.contacts.forEach(function(selected){
                  if (selected._id == contact._id){
                    selected.selected = true;
                  } 
                })
              })
            })
            console.log($ctrl.selectedContacts)
        });
      });
      

    	$ctrl.save = function(){
  /*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
    		$ctrl.request.userId = $ctrl.user._id;
    		$ctrl.request.requestDate = new Date();
    		$http.post(baseUrl + '/api/requests/add', $ctrl.request).then(function(res){
  	      	$ctrl.requestsList.push(res)
  	    });
    	}

    	$ctrl.openModalfromNet = function (size) {
        $ionicModal.fromTemplateUrl('js/requests/selectFromNet.html', {
          scope: $scope
        }).then(function(modal) {
          $ctrl.modal = modal;
          $ctrl.modal.show();

        });

        $ctrl.saveAnswer = function(){
          $ctrl.selectedContacts = [];
          $ctrl.allContatcts.forEach(function(item){
            item.contacts.forEach(function(contact){
              if(contact.selected) {
                $ctrl.selectedContacts.push(contact._id)
              }
            })
          })
          var answer = {
            'requestId': $stateParams.reqId,
            'userId': $ctrl.user._id,
            'contacts' :$ctrl.selectedContacts
          }
           $http.post(baseUrl + '/api/requests/saveAnswer', answer).then(function(){
            $ctrl.modal.hide();
          });
        }


        $ctrl.toggleGroup = function(group) {
          if ($ctrl.isGroupShown(group)) {
            $ctrl.shownGroup = null;
          } else {
            $ctrl.shownGroup = group;
          }
        };
        $ctrl.isGroupShown = function(group) {
          return $ctrl.shownGroup === group;
        };
/*
        ModalFactory.openRequestModal('myModalContent.html', 'ModalInstanceRequestCtrl', $ctrl.allContatcts).then(function(ctrl){
          $ctrl.selectedContacts = [];
          var contactsId = []
          for(friend in ctrl.contacts){
            ctrl.contacts[friend].forEach(function(contact){
              if(contact.selected){
                $ctrl.selectedContacts.push(contact)
                contactsId.push(contact._id)
              };
            });
          };
          var answer = {
            'requestId': $stateParams.reqId,
            'userId': $ctrl.user._id,
            'contacts' :contactsId
          }
          $http.post(baseUrl + '/api/requests/saveAnswer', answer).then(function(){
            console.log('Save');
          });
        })*/
      };
    });
	
}]);

