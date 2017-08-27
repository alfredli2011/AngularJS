angular.module('weatherApp')
.factory('cityService',['$http','$filter',function($http,$filter){
	return{
		appId:'62f711d308141fbaa6aef158b9dc3ab0',
		cityName:'New York',
		days:2,
		getCityId:function(cityName){
			return $http.get('data/city-list.json').then(function(response){
				return $filter('filter')(response.data,function(data){
					return data.name===cityName;
				})[0].id;
			});
		}
	}
}])
.factory('forecastService',['$resource',function($resource){
	return {
		weathers:function(appId,cityId,days){
			return $resource('http://api.openweathermap.org/data/2.5/forecast/daily?')
			.get({appid:appId,id:cityId,cnt:days});
		}
	}
}])


