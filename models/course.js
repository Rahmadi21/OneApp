var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getCourse : function(req, callback){

	var id = req.query.id;
	var cat = req.query.kategori;
	var jur = req.query.jurusan;
	if(id && !cat && !jur){
	connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id where tbl_nama_pelajaran.id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && cat && !jur){
		connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id WHERE tbl_kat_pelajaran.nama_kat=?",[cat], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !cat && jur){
		connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id WHERE tbl_konten.judul=?",[jur], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

postCourse : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kategori = req.body.id_kategori;
		var nama_pelajaran = req.body.nama_pelajaran;

		if(id && id_konten && id_kategori && nama_pelajaran){
			connection.query("INSERT INTO tbl_nama_pelajaran VALUES(?,?,?,?)",[id, id_konten, id_kategori, nama_pelajaran], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
	});
		
		}else{
			console.log("error");
		}
	},	
putCourse  : function(req, callback){

	var id = uuid.v4();
	var id_konten = req.body.id_konten;
	var id_kategori = req.body.id_kategori;
	var nama_pelajaran = req.body.nama_pelajaran;

	if(!!id && !!id_konten && !!id_kategori && !!nama_pelajaran){
		connection.query("UPDATE tbl_nama_pelajaran SET id_konten=?, id_kategori=?, nama_pelajaran=? WHERE id=?",[id, id_konten, id_kategori, nama_pelajaran], function (err, rows, fileds){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else {
		console.log("error");
	}

},

	deleteCourse : function (req,call){
	var Id = req.body.id || uuid.v4();

	if(!!Id){
		connection.query("DELETE FROM tbl_nama_pelajaran WHERE id=?",[Id],function (err, rows, fields){
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
