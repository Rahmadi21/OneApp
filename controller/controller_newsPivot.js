var model = require("../models/newsPivot.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getNewsPivot : function (req,res){
		model.getNewsPivot(req, function (error,result){
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
