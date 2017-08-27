var app=angular.module('myApp',[]);

app.controller('myCtrl',['$scope',function($scope){
	$scope.user={};
	
	$scope.submit=function(){
		console.log($scope.user);
	}
	$scope.reset=function(){
		$scope.user={};
	}
}])
.directive('idRule',function(){
	return {
		require: 'ngModel',
		link: function(scope,element,attr,mCtrl){
			function myValidation(value){
				let userId=['Jack','Allen','Baber','Jim'];
				mCtrl.$setValidity('idcheck',true);
				for(let x of userId){
					if(value==x){
						console.log(value==x);
						mCtrl.$setValidity('idcheck',false);
						break;
					}
				}
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	}
})
.directive('passwordRule',function(){
	return {
		require: 'ngModel',
		link: function(scope,element,attr,mCtrl){
			function myValidation(value){
				if((/\d/g).test(value)){
					mCtrl.$setValidity('passwordcheck',true);
				}else{
					mCtrl.$setValidity('passwordcheck',false);
				}
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	}
})
.directive('reenterRule',function(){
	return {
		require: 'ngModel',
		link: function(scope,element,attr,mCtrl){
			function myValidation(value){
				if(value==$scope.user.password){
					mCtrl.$setValidity('reentercheck',true);
				}else{
					mCtrl.$setValidity('reentercheck',false);
				}
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	}
})