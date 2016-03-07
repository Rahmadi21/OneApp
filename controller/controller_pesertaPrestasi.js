var model = require("../models/prestasiPeserta.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

module.exports = {
	getPesertaPrestasi : function (req,res){
		model.getPesertaPrestasi(req, function (error,result){
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
	,

	postPesertaPrestasi : function (req,res){
		model.postPesertaPrestasi(req, function (error,result){
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
	,

	putPesertaPrestasi : function (req,res){
		model.putPesertaPrestasi(req, function (error,result){
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

	deletePesertaPrestasi : function (req,res){
		model.deletePesertaPrestasi(req, function (error,result){
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
