var app=angular.module('groceryListApp',['ngRoute']);

app.controller('listCtrl',['$scope','groceryService',function($scope,groceryService){
	$scope.groceryItems=groceryService.groceryItems;
	$scope.removeItem=function(entry){
		groceryService.removeItem(entry);
	};
	$scope.markCompleted=function(entry){
		groceryService.markCompleted(entry);
	}
	$scope.$watch(function(){return groceryService.groceryItems;},function(groceryItems){
		$scope.groceryItems=groceryItems;
	});
}]);

app.controller('itemCtrl',['$scope','$routeParams','$location','groceryService',function($scope,$routeParams,$location,groceryService){
	if(!$routeParams.id){
		let dt=new Date();
		$scope.groceryItem={id:0,completed:true,itemName:'',date:dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()};
	}else{
		$scope.groceryItem=_.clone(groceryService.findById(parseInt($routeParams.id)));
	}
	$scope.save=function(){
		groceryService.save($scope.groceryItem);
		$location.path('/');
	};
}]);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/groceryList.html',
		controller:'listCtrl'
	})
	.when('/addItem',{
		templateUrl:'views/addItem.html',
		controller:'itemCtrl'
	})
	.when('/addItem/edit/:id',{
		templateUrl:'views/addItem.html',
		controller:'itemCtrl'
	})
	.otherwise({
		redirectTo:'/'
	})
});

app.service('groceryService',['$http',function($http){
	var _this=this;
	this.groceryItems=[];
	$http({
		method:'get',
		url:'data/server_data.json'
	}).then(function(response){
		_this.groceryItems=response.data;
	},function(data,status){
			alert('Things went wrong!');
	});
	this.findById=function(id){
		for(let item of this.groceryItems){
			if(item.id===id){
				return item;
			}
		}
	};
	this.getNewId=function(){
		if(this.newId){
			this.newId++;
			return this.newId;
		}else{
			let maxId=_.max(this.groceryItems,function(entry){
				return entry.id;
			});
			this.newId=maxId.id+1;
			return this.newId;
		}
	};
	this.markCompleted=function(entry){
		entry.completed=!entry.completed;
	}
	this.removeItem=function(entry){
		let _this=this;
		$http.get('data/delete_item.json')
		.then(function(response){
			if(response.data.status===1){
				let index=_this.groceryItems.indexOf(entry);
				_this.groceryItems.splice(index,1);
			}
		},function(response,status){});
		
	};
	this.save=function(entry){
		let updateItem=this.findById(entry.id);
		if(updateItem){
			$http.get('data/updated_item.json')
			.then(function(response){
				if(response.data.status===1){
					angular.copy(entry,updateItem);
				}
			},function(response,status){});
		}else{
			$http.get('data/added_item.json')
			.then(function(response){
				entry.id=response.data.newId;
			},function(response, status){});
			this.groceryItems.push(entry);
		}
	};
}]);

app.directive('groceryListItem',function(){
	return{
		restrict:'E',
		templateUrl:'views/groceryItem.html'
	}
});