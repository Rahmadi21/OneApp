var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getCatResponse :function (req,res){
	var data = {
		"error":1,
		"Data":""
	};
	
	connection.query("SELECT * from tbl_kat_respon",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Data"] = rows;
			res.json(data);
		}else{
			data["Data"] = 'No books Found..';
			res.json(data);
		}
	});
} ,

	postCatResponse : function (req,res){

	var id = uuid.v4;
	var tipe_respon = req.body.tipe_respon;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!tipe_respon){
		connection.query("INSERT tbl_kat_respon SET tipe_respon=? WHERE id=?",[id,tipe_respon],function (err, rows, fields){
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

	putCatResponse  :function (req, res){

	var id = uuid.v4;
	var tipe_respon = req.body.tipe_respon;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!tipe_respon){
		connection.query("UPDATE tbl_kat_respon SET tipe_respon=?, WHERE id=?",[id,tipe_respon], function (err, rows, fields){
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

	deleteCatResponse :function (req, res){

	var id = uuid;
	var tipe_respon = req.body.tipe_respon;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!tipe_respon){
		connection.query("DELETE FROM tbl_kat_respon WHERE id=?",[id, tipe_respon],function (err, rows, fields){
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
