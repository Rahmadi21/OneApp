var mysql = require('mysql');
var uuid  = require('node-uuid');
var conn = require('../config/conn.js');
var connection = mysql.createConnection(conn);

module.exports = {
	getResponseAttend : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id;
	var cat = req.params.cat;
	var kon = req.query.konten;
	if(id && !cat && !kon){
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_kat_respon.tipe_respon=? AND tbl_konten_respon.id=?",[cat,id], function (err, rows, fields){
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
	else if(!id && !cat && kon){
		connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_konten.id=?",[kon], function (err, rows, fields){
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
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_kat_respon.tipe_respon=?",[cat], function (err, rows, fields){
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

}

	
}
