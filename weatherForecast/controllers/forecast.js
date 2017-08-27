angular.module('weatherApp')
.controller('ForecastCtrl',['$scope','$routeParams','$location','cityService','forecastService',function($scope,$routeParams,$location,cityService,forecastService){
	$scope.appId=cityService.appId;
	$scope.cityName=cityService.cityName;
	$scope.days=$routeParams.days||2;
	$scope.cityId=$routeParams.cityId;
	if($scope.cityId){
		$scope.weathers=forecastService.weathers($scope.appId,$scope.cityId,$scope.days);
	}else{
		cityService.getCityId($scope.cityName)
		.then(function(cityId){
			$scope.cityId=cityId;
			$scope.weathers=forecastService.weathers($scope.appId,cityId,$scope.days);
			$location.search({'cityId':cityId,'days':$scope.days});
		});
	}
	$scope.convertToFah=function(degK){
		return Math.round(1.8*(degK-273.15)+32);
	};
	$scope.convertDate=function(dt){
		return new Date(dt*1000);
	};
}])
.directive('weatherReport',function(){
	return {
		restrict:'E',
		templateUrl:'directives/weatherReport.html',
		replace:true,
		scope:{
			weatherDay:'=',
			convertTemp:'&',
			convertDate:'&',
			dateFormat:'@'
		}
	}
});