var mysql 		= require('mysql');
var uuID  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {

	getNewsTag : function (req, callback){

	var id = req.query.id;
	var kon = req.query.konten;
	if(id && !kon){
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id where tbl_konten_tag.id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && kon){
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id where tbl_konten.id=?",[kon], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	
	else{
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postNewsTag : function(req, callback) {
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;

	if(Id && Id_Konten && Tag){
		connection.query("INSERT INTO tbl_konten_pivot VALUES(?,?,?)",[Id,Id_Konten,Tag],function (err, rows, fields){
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

	putNewsTag  : function(req, callback){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;

	if(Id && Id_Konten && Tag){
		connection.query("UPDATE tbl_konten_pivot SET id_konten=?, id_kat_respon=?, id_user=?, tgl_respon=?,isi=? WHERE id=?",[Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi,Id],function (err, rows, fields){
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

	deleteNewsTag : function(req, callback){
	var Id = req.body.id;

	if(!!Id){
		connection.query("DELETE FROM tbl_konten_tag WHERE id=?",[Id],function (err, rows, fields){
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
