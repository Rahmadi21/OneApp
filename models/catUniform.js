var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);


module.exports = {

	getCatUniform : function (req, callback){

	var id = req.query.kategori;
	if(id){
	connection.query("select tbl_seragam.id, tbl_kat_seragam.kategori, tbl_konten.judul as jurusan, tbl_seragam.nama, tbl_seragam.waktu_pakai, tbl_seragam.foto from tbl_seragam inner join tbl_konten on tbl_seragam.id_konten = tbl_konten.id inner join tbl_kat_seragam on tbl_seragam.id_kat_seragam = tbl_kat_seragam.id WHERE tbl_kat_seragam.kategori=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_kat_seragam", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postCatUniform : function(req,callback){
	var Id = uuID.v4();
	var Kategori = req.body.kategori;

	if(Id && Kategori){
		connection.query("INSERT INTO tbl_kat_seragam VALUES(?,?)",[Id,Kategori],function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else{
		console.log("error");
	}}

	,

	putCatUniform  : function(req,callback){
	var Id = req.body.id;
	var Kategori = req.body.kategori;

	if(Id && Kategori){
		connection.query("UPDATE tbl_kat_seragam SET kategori=? WHERE id=?",[Kategori,Id],function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else{
		console.log("error");
	}}

	,

	deleteCatUniform : function(req,callback){
	var Id = req.body.id;

	if(!!Id){
		connection.query("DELETE FROM tbl_kat_seragam WHERE id=?",[Id],function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else{
		console.log("error");
	}}
	
}
