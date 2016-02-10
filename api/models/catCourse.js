var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getCatCourse :  function (req,res){
	var data = {
		"error":1,
		"Data":""
	};
	
	connection.query("SELECT * from tbl_kat_pelajaran",function (err, rows, fields){
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

	postCatCourse :function (req,res){

	var id = uuid.v4;
	var nama_kat = req.body.nama_kat;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!nama_kat){
		connection.query("INSERT tbl_kat_pelajaran SET nama_kat=? WHERE id=?",[id,nama_kat],function (err, rows, fields){
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

	putCatCourse  :function (req, res){

	var id = uuid.v4;
	var nama_kat = req.body.nama_kat;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!nama_kat){
		connection.query("UPDATE tbl_kat_pelajaran SET nama_kat=?, WHERE id=?",[id,nama_kat], function (err, rows, fields){
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

	deleteCatCourse : function (req, res){

	var id = uuid;
	var nama_kat = req.body.nama_kat;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!nama_kat){
		connection.query("DELETE FROM tbl_kat_pelajaran WHERE id=?",[id, nama_kat],function (err, rows, fields){
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
}}
}