'use strict';

/**
 * @ngdoc function
 * @name pnChatApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the pnChatApp
 */
angular.module('pnChatApp')
.controller('JoinCtrl', ['$scope','$rootScope','$location','Pubnub',function ($scope,$rootScope,$location,Pubnub){
  $scope.data={
  	username:'User_'+Math.floor(Math.random()*1000)
  };
  $scope.join=function(){
  	console.log('Joining...');
  	let _ref;
  	$rootScope.data||($rootScope.data={});
  	$rootScope.data.username=(_ref=$scope.data)!=null?_ref.username:void 0;
  	$rootScope.data.city=(_ref=$scope.data)!=null?_ref.city:void 0;
  	$rootScope.data.uuid=Math.floor(Math.random()*1000000)+'__'+$scope.data.username;
  	console.log($rootScope);
  	Pubnub.init({
  		subscribeKey:'sub-c-75be0ada-6c8c-11e7-9b18-02ee2ddab7fe',
  		publishKey:'pub-c-9d2a5830-ec5f-4011-934b-c1d6a82cddcb',
  		uuid:$rootScope.data.uuid
  	});
  	return $location.path('/main');
  }
}]);
