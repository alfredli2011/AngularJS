var express = require('express');
var router = express.Router();

let article=require('../models/article');
/* GET users listing. */
router.get('/', function(req, res, next) {
	article.getArticles(function(err,articles){
		if(err){
			console.log(err);
		}
		res.json(articles);
	})
});
router.get('/:id', function(req, res, next) {
	article.getArticleById(req.params.id,function(err,article){
		if(err){
			console.log(err);
		}
		res.json(article);
	})
});
router.get('/category/:category', function(req, res, next) {
	article.getArticlesByCategory(req.params.category,function(err,articles){
		if(err){
			console.log(err);
		}
		res.json(articles);
	})
});
router.post('/',function(req,res,next){
	let title=req.body.title;
	let body=req.body.body;
	let category=req.body.category;
	let newArticle=new article({
		title:title,
		body:body,
		category:category
	});
	article.createArticle(newArticle,function(err,article){
		if(err){
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles');
	});
});
router.put('/',function(req,res,next){
	let id=req.body.id;
	let data=new article({
		title:req.body.title,
		body:req.body.body,
		category:req.body.category
	});
	article.updateArticle(id,data,function(err,article){
		if(err){
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles');
	});
});
router.delete('/:id',function(req,res,next){
	let id=req.params.id;
	article.removeArticle(id,function(err,article){
		if(err){
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles');
	});
});
module.exports = router;
