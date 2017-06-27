angular.module('starter')
  .controller('UserContactsController', ['$cordovaContacts','$scope', '$http',  '$localStorage', 'AuthFactory', 'baseUrl', 'ContactsService', '$ionicPlatform', function($cordovaContacts, $scope, $http, $localStorage, AuthFactory, baseUrl, ContactsService, $ionicPlatform){
    $ionicPlatform.ready(function() {
       window.plugins.sim.getSimInfo(successCallback, errorCallback);
        function successCallback(result) {
          console.log(result);
          $scope.phoneNumber = result.phoneNumber;
        }
        function errorCallback(error) {
          console.log(error);
        }
        $cordovaContacts.find({filter : '', fields:  [ 'displayName']}).then(function(allContacts) { //replace 'Robert' with '' if you want to return all contacts with .find()
                  $scope.contacts = [];
                  allContacts.forEach(function(contact){
                    var userContact = {
                      'displayName' : contact.displayName,
                      'emails' : contact.emails
                    };
                    if(contact.phoneNumbers != null){
                      userContact.phones = contact.phoneNumbers.map(function(phone){
                        return phone.value;
                      });
                    }else {
                      userContact.phones = null;
                    };
                   
                    $scope.contacts.push(userContact);
                  })
                  $http.post(baseUrl + '/api/user/findByContactsList', $scope.contacts).then(function(res){
                    $scope.resFriends = res.data;
                  })
              });
      
    })
}]);