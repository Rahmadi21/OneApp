var mysql = require('mysql');
var uuID = require('node-uuid');
var connection 		= require('../config/conn.js')
var con  = mysql.createConnection(connection);

module.exports = {
	getContent : function (req,callback){

	var id = req.query.id;
	if(id){
	con.query("SELECT tbl_konten.*,tbl_kat_konten.konten,tbl_user.username as penulis from tbl_konten INNER JOIN tbl_kat_konten ON tbl_konten.id_kat_konten = tbl_kat_konten.id inner join tbl_user on tbl_konten.id_user = tbl_user.id where id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	con.query("SELECT tbl_konten.*,tbl_kat_konten.konten,tbl_user.username as penulis from tbl_konten INNER JOIN tbl_kat_konten ON tbl_konten.id_kat_konten = tbl_kat_konten.id inner join tbl_user on tbl_konten.id_user = tbl_user.id ", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},
	
	postContent : function(req,callback){
	var Id = uuID.v4();
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status.toString();

	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){
		con.query("INSERT INTO tbl_konten VALUES(?,?,?,?,?,?,?)",[Id,Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status],function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else{
		console.log("error");
	}},

	putContent : function(req,callback){
	var Id = req.body.id;
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;

	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){
		con.query("UPDATE tbl_konten SET id_kat_konten=?, id_user=?, tgl_posting=?, judul=?, isi=?, status=? WHERE id=?",[Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status,Id],function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}else{
		console.log("error");
	}},

	deleteContent : function(req,callback){
	var Id = req.body.id;

	if(!!Id){
		con.query("DELETE FROM tbl_konten WHERE id=?",[Id],function (err, rows, fields){
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