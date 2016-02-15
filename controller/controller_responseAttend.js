var model = require("../models/responseAttend.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getResponseAttend : function (req,res){
		model.getResponseAttend(req, function (error,result){
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
