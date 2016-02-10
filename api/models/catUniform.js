var mysql = require('mysql');
var uuID  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
<<<<<<< HEAD
	getCatUniform : function () {
		
	}
=======
<<<<<<< HEAD
	getCatUniform : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_kat_seragam",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});}

	,

	postCatUniform : function (req,res){
	var Id = uuID.v4();
	var Kategori = req.body.kategori;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Kategori){
		connection.query("INSERT INTO tbl_kat_seragam VALUES(?,?)",[Id,Kategori],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	putCatUniform  : function (req,res){
	var Id = req.body.id;
	var Kategori = req.body.kategori;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Kategori){
		connection.query("UPDATE tbl_kat_seragam SET kategori=? WHERE id=?",[Kategori,Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	deleteCatUniform : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_kat_seragam WHERE id=?",[Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Delete Success";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}
=======
	getCatUniform : {}
>>>>>>> 6882b2bebf711a4c8712c1875689741559cb0539

	,

	postCatUniform : function () {
		
	}

	,

	putCatUniform  : function () {
		
	}
	,

<<<<<<< HEAD
	deleteCatUniform : function () {
		
	}
=======
	deleteCatUniform : {}
>>>>>>> 212251080acff3c3cf59a66e8549d6fa9b09ba43
>>>>>>> 6882b2bebf711a4c8712c1875689741559cb0539
}
