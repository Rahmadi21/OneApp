var model = require("../models/newsPivot.js");

module.exports = {
	getNewsPivot : function (req,res){
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
