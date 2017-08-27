var mongoose=require('mongoose');
var articleSchema=mongoose.Schema({
	title:{
		type:String,
		index:true,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	category:{
		type:String,
		index:true,
		required:true
	},
	date:{
		type:Date,
		default:Date.now
	}
});
var article=module.exports=mongoose.model('article',articleSchema);
module.exports.getArticles=function(callback){
	article.find(callback);
};
module.exports.getArticleById=function(id,callback){
	article.findById(id, callback);
};
module.exports.getArticlesByCategory=function(category,callback){
	let query={category:category};
	article.find(query,callback);
};
module.exports.createArticle=function(newArticle,callback){
	newArticle.save(callback);
};
module.exports.updateArticle=function(id,data,callback){
	let title=data.title;
	let body=data.body;
	let category=data.category;
	let query={_id:id};
	article.findById(id,function(err,article){
		if(!article){
			return next(new Error('Could not load article'));
		}else{
			article.title=title;
			article.body=body;
			article.category=category;
			article.save(callback);
		}
	});
};
module.exports.removeArticle=function(id,callback){
	article.find({_id:id}).remove(callback);
};