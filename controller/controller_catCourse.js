var model = require("../models/catCourse.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getCatCourse : function (req,res){
		model.getCatCourse(req, function (error,result){
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
	postCatCourse : function (req,res){
		model.postCatCourse(req, function (error,result){
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
	putCatCourse  : function (req,res){
		model.putCatCourse(req, function (error,result){
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
	deleteCatCourse : function (req,res){
		model.deleteCatCourse(req, function (error,result){
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

