var model = require("../models/catResponse.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getCatResponse : function (req,res){
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

	postCatResponse :function (req,res){
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

	putCatResponse  :function (req,res){
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

	deleteCatResponse :function (req,res){
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
