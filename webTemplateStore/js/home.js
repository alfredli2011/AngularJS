angular.module('templateStore')
.controller('HomeCtrl',['$scope','$http',function($scope,$http){
	$http.get('json/templates.json').then(function(response){
		$scope.templates=response.data;
	});
}])