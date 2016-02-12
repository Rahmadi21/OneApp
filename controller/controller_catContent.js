var model = require("../models/catContent.js");

var data = {
	"status" : "error",
	"detail" : "data not found"
}

module.exports = {
	getCatContent : function (req,res){
		model.get(function (error,result){
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


	postCatContent : function (req,res){
		model.get(req, function (error,result){
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

	putCatContent  : function (req,res){
		model.get(req, function (error,result){
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

	deleteCatContent : function (req,res){
		model.get(req, function (error,result){
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
