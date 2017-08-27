angular.module('templateStore',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl:'views/home.html',
		controller:'HomeCtrl'
	})
	.when('/template/:id',{
		templateUrl:'views/template.html',
		controller:'TemplateCtrl'
	})
	.otherwise({
		redirectTo:'/home'
	});
}]);
