var model = require("../models/catUniform.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {

	getCatUniform : function (req,res){
		model.getCatUniform(req, function (error,result){
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

	postCatUniform : function (req,res){
		model.postCatUniform(req, function (error,result){
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

	putCatUniform  : function (req,res){
		model.putCatUniform(req, function (error,result){
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

	deleteCatUniform : function (req,res){
		model.deleteCatUniform(req, function (error,result){
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
