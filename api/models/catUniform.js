var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);


module.exports = {

	getCatUniform : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.kategori;
	if(id){
	connection.query("select tbl_seragam.id, tbl_kat_seragam.kategori, tbl_konten.judul as jurusan, tbl_seragam.nama, tbl_seragam.waktu_pakai, tbl_seragam.foto from tbl_seragam inner join tbl_konten on tbl_seragam.id_konten = tbl_konten.id inner join tbl_kat_seragam on tbl_seragam.id_kat_seragam = tbl_kat_seragam.id WHERE tbl_kat_seragam.kategori=?",[id], function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});	
	}
	else{
	connection.query("SELECT * from tbl_kat_seragam", function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});
	}

},

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
	
}
