var data = {
		"Data":""
	};

module.exports = {
	
	get : function (req, res){
	
	data["Data"] = "Selamat datang di OneApp";
	res.json(data);
	}
	,
	getApi : function (req,res){
	data['Data'] = "API OneApp, for more information check our repository on github";
	res.json(data);
	}
}