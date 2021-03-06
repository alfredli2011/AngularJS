angular.module('kbApp',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/categories',{
		templateUrl:'views/categories.view.html',
		controller:'CategoriesCtrl'
	})
	.when('/articles',{
		templateUrl:'views/articles.view.html',
		controller:'ArticlesCtrl'
	})
	.when('/articles/details/:id',{
		templateUrl:'views/article_details.view.html',
		controller:'ArticleDetailsCtrl'
	})
	.when('/articles/category/:category',{
		templateUrl:'views/articles_category.view.html',
		controller:'ArticlesCategoryCtrl'
	})
	.when('/articles/add',{
		templateUrl:'views/add_article.view.html',
		controller:'AddArticleCtrl'
	})
	.when('/articles/edit/:id',{
		templateUrl:'views/edit_article.view.html',
		controller:'EditArticleCtrl'
	})
	.otherwise({
		redirectTo:'/categories'
	})
}])