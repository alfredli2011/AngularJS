angular.module('weatherApp')
.controller('HomeCtrl',['$scope','cityService',function($scope,cityService){
	$scope.cityName=cityService.cityName;
	$scope.$watch('cityName',function(cityName){
		cityService.cityName=cityName;
	});
}]);