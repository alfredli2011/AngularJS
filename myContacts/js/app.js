'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts', ['ngRoute','firebase','myContacts.contacts'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/contacts'});
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDgDwW2oTg7H_Gn_pfF2CqTRd8AepeAM3s",
    authDomain: "mycontacts-ff7a9.firebaseapp.com",
    databaseURL: "https://mycontacts-ff7a9.firebaseio.com",
    projectId: "mycontacts-ff7a9",
    storageBucket: "mycontacts-ff7a9.appspot.com",
    messagingSenderId: "569441703576"
  };
  firebase.initializeApp(config);
}]);
