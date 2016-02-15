var model = require("../models/prestationPivot.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getPrestationPivot : function (req,res){
		model.getPrestationPivot(req, function (error,result){
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
