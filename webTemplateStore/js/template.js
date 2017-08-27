angular.module('templateStore')
.controller('TemplateCtrl',['$scope','$http','$routeParams','$filter',function($scope,$http,$routeParams,$filter){
	$http.get('json/templates.json').then(function(response){
		$scope.template=$filter('filter')(response.data,function(data){
			return data.id==$routeParams.id;
		})[0];
		$scope.fullImage=$scope.template.images[0].name;
	});
	$scope.setImage=function(image){
		$scope.fullImage=image.name;
	}
}]);