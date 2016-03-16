var model = require("../models/content.js");

var data = {

	"status" : "error",
	"detail" : "data not found"	
};

module.exports = {
	getContent : function (req,res){
		model.getContent(req, function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
				data["count"] ="error";
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});
	},
	
	postContent : function (req,res){
		model.postContent(req, function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});
	},

	putContent : function (req,res){
		model.putContent(req, function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});
	},

	deleteContent : function (req,res){
		model.deleteContent(req, function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});
	}

}