angular.module('starter.controllers', [])
 .service("ContactsService", ['$q', function($q) {
    var formatContact = function(contact) {
      return {
        "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
        "emails"        : contact.emails || [],
        "phones"        : contact.phoneNumbers || [],
        "photos"        : contact.photos || []
      };
    };
    var pickContact = function() {
      var deferred = $q.defer();
      if(navigator && navigator.contacts) {
          navigator.contacts.find(function(contact){
              deferred.resolve( formatContact(contact) );
          });
      } else {
        deferred.reject("Bummer.  No contacts in desktop browser");
      }
      return deferred.promise;
    };
    return {
      pickContact : pickContact
    };
  }])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage,AuthFactory, $state, $cordovaContacts, $ionicPlatform,ContactsService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //})

  // Form data for the login modal
  $scope.loginData = {};
  console.log($state,$localStorage.token)
  if ($localStorage.token == undefined){
    console.log('sdfsf')
    $state.go('login')
   /* $ionicModal.fromTemplateUrl('templates/auth.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });*/
  }else {
    $scope.token = $localStorage.token;
    AuthFactory.me().then(function(user){
      $scope.user = user.data.data;
    })
  }

  $scope.pickContact = function() {
    ContactsService.pickContact().then(
        function(contact) {
            $scope.data.selectedContacts.push(contact);
            console.log("Selected contacts=");
            console.log($scope.data.selectedContacts);
        },
        function(failure) {
            $scope.error = failure
            console.log("Bummer.  Failed to pick a contact", failure);
        }
    );
  }

  $ionicPlatform.ready(function() {
     window.plugins.sim.getSimInfo(successCallback, errorCallback);
      function successCallback(result) {
        console.log(result);
        $scope.phoneNumber = result.phoneNumber;
      }
      function errorCallback(error) {
        console.log(error);
      }
      $scope.getAllContacts = function() {
            $cordovaContacts.find({filter : 'me', fields:  [ 'displayName']}).then(function(allContacts) { //replace 'Robert' with '' if you want to return all contacts with .find()
                $scope.contacts = allContacts;
                console.log(JSON.stringify(allContacts));
            });
        };
  })

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logOut = function() {
    AuthFactory.logout()
    $state.go('login');
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('do')
  //   AuthFactory.signin( $scope.loginData).then(function(res){
  //     if (res.data.type == false) {
  //         alert(res.data)    
  //     } else {
  //         $localStorage.token = res.data.token;
  //         $state.go("app.main");    
  //         $scope.modal.hide();
  //     }
  //   })
  // };
})