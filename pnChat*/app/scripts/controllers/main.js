'use strict';

/**
 * @ngdoc function
 * @name pnChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pnChatApp
 */
angular.module('pnChatApp')
.controller('MainCtrl',['$scope','$rootScope','$location','Pubnub',function ($scope,$rootScope,$location,Pubnub){
  	let _ref;
  	if(!$rootScope.data){
  		$location.path('/join');
  	}
    $scope.newChannel='The Waiting Room';
  	$scope.channels=['The Waiting Room'];
  	$scope.createChannel=function(){
  		console.log('Creating Channel...');
  		let channel;
	  	channel=$scope.newChannel;
      $scope.channels.push(channel);
	  	// $scope.newChannel='';
	  	// Pubnub.grant({
	   //  	channel:channel,
	   //  	read:true,
	   //  	write:true,
	   //  	callback:function(){
	  	//   		return console.log(channel+'All Set',arguments);
	   //  	}
	  	// });
	  	// Pubnub.grant({
	   //  	channel:channel+'-pnpres',
	   //  	read:true,
	   //  	write:false,
	   //  	callback:function(){
	  	//   		return console.log(channel+'Presence All Set',arguments);
	   //  	}
	  	// });
	  	// Pubnub.publish({
	  	// 	channel:$scope.controlChannel,
	  	// 	message:channel
	  	// });
	  	return setTimeout(function(){
	  		$scope.subscribe(channel);
	  		  return $scope.showCreate=false;
	  	},100);
	};

	$scope.subscribe=function(channel){
		let _ref;
		console.log('Subscribing...');
		if(channel===$scope.selectedChannel){
		return;
		}
		if($scope.selectedChannel){
		  Pubnub.unsubscribe({
	  		channel:$scope.selectedChannel
		  });
		}
		$scope.selectedChannel=channel;
		$scope.message='Welcome to '+channel;
		Pubnub.subscribe({
		  channel:$scope.selectedChannel,
		  state:{
  			'city':((_ref=$rootScope.data)!=null?_ref.city:void 0)||'unknown'
		  },
		  error:function(){
			  return console.log('eror: '+arguments);
		  }
		});
		Pubnub.hereNow({
			channel:$scope.selectedChannel,
      includeUUIDs:true
		},function(status,m){
      console.log('uuids: ',m.uuid);
      $scope.users=status.uuids;
    });
		Pubnub.history({
			channel:$scope.selectedChannel,
			count:50
		},function(status,response){
      console.log(response);
      $scope.messages=response;
    });
  };
  $scope.publish=function(){
    if(!$scope.selectedChannel){
      return;
    }
    Pubnub.publish({
      channel:$scope.selectedChannel,
      message:{
        text:$scope.newMessage,
        user:$scope.data.username
      }
    });
    return $scope.newMessage='';
  };
}]);
