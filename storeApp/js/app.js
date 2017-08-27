angular.module('storeApp',[])
.controller('StoreCtrl',['$scope','$http','getItems',function($scope,$http,getItems){
	getItems.items().then(function(items){
		$scope.items=items;
		console.log($scope.items);
	});
	console.log(getItems);
	$scope.getId=function(){
		return $scope.items.length;
	}
	$scope.addItem=function(){
		let newItem={
			name:$scope.name,
			description:$scope.description,
			price:$scope.price,
			id:$scope.getId()
		};
		// $http.post('products.json',newItem).then(function(res){
		 	$scope.items.unshift(newItem);
		 	console.log($scope.items);
		// },function(err){
		// 	console.log('Error: '+err);
		// });
		$scope.name="";
		$scope.description="";
		$scope.price="";
	};
	$scope.removeItem=function(item){
		for(let i in $scope.items){
			if($scope.items[i].id===item.id){
				$scope.items.splice(i,1);
				console.log($scope.items);
				// $http.put('products.json',$scope.items);
				return;
			}
		}
	};
}])