var mysql 		= require('mysql');
var uuID  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {

	getNewsTag : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id;
	var kon = req.query.konten;
	if(id && !kon){
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id where tbl_konten_tag.id=?",[id], function (err, rows, fields){
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
	else if(!id && kon){
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id where tbl_konten.id=?",[kon], function (err, rows, fields){
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
	connection.query("SELECT tbl_konten_tag.id, tbl_konten_tag.id_konten, tbl_konten.judul as konten, tbl_konten_tag.tag from tbl_konten_tag INNER JOIN tbl_konten on tbl_konten_tag.id_konten = tbl_konten.id", function (err, rows, fields){
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

	postNewsTag : function (req,res) {
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tag){
		connection.query("INSERT INTO tbl_konten_pivot VALUES(?,?,?)",[Id,Id_Konten,Tag],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Succesfull";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	putNewsTag  : function (req,res){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tag){
		connection.query("UPDATE tbl_konten_pivot SET id_konten=?, id_kat_respon=?, id_user=?, tgl_respon=?,isi=? WHERE id=?",[Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi,Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Edit Success";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	deleteNewsTag : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_konten_tag WHERE id=?",[Id],function (err, rows, fields){
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
