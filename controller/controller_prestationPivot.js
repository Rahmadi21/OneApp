var model = require("../models/prestationPivot.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getPresPivot : function (req,res){
		model.getPresPivot(function (error,result){
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
	postPrestasiPivot : function (req,res){
		model.postPrestasiPivot(req, function (error,result){
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

	deletePrestasiPivot : function (req,res){
		model.deletePrestasiPivot(req, function (error,result){
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
