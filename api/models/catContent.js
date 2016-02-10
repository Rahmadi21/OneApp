var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getCatContent :  function (req,res){
	var data = {
		"error":1,
		"Data":""
	};
	
	connection.query("SELECT * from tbl_kat_konten",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Data"] = rows;
			res.json(data);
		}else{
			data["Data"] = 'No books Found..';
			res.json(data);
		}
	});
},

	postCatContent :function (req,res){

	var id = uuid.v4;
	var konten = req.body.konten;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!konten){
		connection.query("UPDATE tbl_kat_respon SET konten=? WHERE id=?",[id,konten],function (err, rows, fields){
			if(!!err){
				data["Data"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Data"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Data"] = "Please provide all required data (i.e : id, nama_kat)";
		res.json(data);
	}
},

	putCatContent  : function (req, res){

	var id = uuid.v4;
	var konten = req.body.konten;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!konten){
		connection.query("UPDATE tbl_kat_konten SET konten=?, WHERE id=?",[id,konten], function (err, rows, fields){
			if (!!err){
				data["Data"] = "Error Updating Data";
			}else{
				data["error"] = 0;
				data["Data"] = "Updated Book Succesfully";
			}
			res.json(data);
		});
	}else {
		data["Data"] = "Please provide all required data (i.e : id, nama_kat)";
		res.json(data);
	}

},

	deleteCatContent :function (req, res){

	var id = uuid;
	var konten = req.body.konten;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!konten){
		connection.query("DELETE FROM tbl_kat_konten WHERE id=?",[id,konten],function (err, rows, fields){
			if (!!err){
				data["Data"] = "Error Updating Data";
			}else{y

				data["error"] = 0;
				data["Data"] = "Updated Book Succesfully";
			}
			res.json(data);
		});
	}else {
		data["Data"] = "Please provide all required data (i.e : id, nama_kat)";
		res.json(data);
	}

};
}
