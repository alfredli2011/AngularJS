'use strict';

/**
 * @ngdoc overview
 * @name pnChatApp
 * @description
 * # pnChatApp
 *
 * Main module of the application.
 */
angular
  .module('pnChatApp', [
    'ngResource',
    'ngRoute',
    'pubnub.angular.service'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/join', {
        templateUrl: 'views/join.html',
        controller: 'JoinCtrl',
      })
      .otherwise({
        redirectTo: '/join'
      });
  });
