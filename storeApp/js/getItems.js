angular.module('storeApp')
.factory('getItems',['$http',function($http){
	console.log(this);
	return {
		items:function(){
			return $http.get('products.json').then(function(res){
				return res.data;
			},function(err){
				console.log('Error: '+err);
			});
		}
	};
}])