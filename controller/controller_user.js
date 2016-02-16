var model = require("../models/tbl_user.js");

var data = {

	"status" : "error",
	"detail" : "data not found"
	
};

var controller = {
	getuser: function (req,res){
		model.getuser(req,function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
			
		})
	},

	postUser : function (req,res){
		model.postUser(req, function (error,result){
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

	putUser : function (req,res){
		model.putUser(req, function (error,result){
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

	deleteUser : function (req,res){
		model.deleteUser(req, function (error,result){
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
	getCatUser: function (req,res){
		model.getCatUser(req,function (error,result){
			if(error){
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
			
		})
	}

}
module.exports = controller;

