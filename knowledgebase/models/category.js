var mongoose=require('mongoose');
var categorySchema=mongoose.Schema({
	name:{
		type:String,
		index:true,
		required:true
	},
	description:{
		type:String
	}
});
var category=module.exports=mongoose.model('category',categorySchema);
module.exports.getCategories=function(callback){
	category.find(callback);
};
module.exports.getCategoryById=function(id,callback){
	category.findById(id, callback);
};
module.exports.createCategory=function(newCategory,callback){
	newCategory.save(callback);
};
