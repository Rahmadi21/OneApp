var model = require("../models/divisionFavorite.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getFavorite : function (req,res){
		model.getFavorite(function (error,result){
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
