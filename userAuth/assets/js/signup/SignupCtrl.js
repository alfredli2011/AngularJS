angular.module('SignupMod')
.controller('SignupCtrl',['$scope','$http',function($scope,$http){
	$scope.runSignup=function(){
		console.log('Signing Up '+$scope.name);
		$http.post('/signup',{
			name:$scope.name,
			email:$scope.email,
			password:$scope.password
		})
		.then(function(response){
			window.location='/user';
		})
		.catch(function(err){
			console.log('Error: '+err);
		});
	};
}]);