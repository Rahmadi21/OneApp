var mysql = require('mysql');
var uuid  = require('node-uuid');
var conn = require('../config/conn.js');
var connection = mysql.createConnection(conn);

module.exports = {
	getResponseAttend : function (req,res){
		var data = {
			"error":1,
			"one_app":""
		}
		var cat = req.params.cat
		connection.query("SELECT tbl_konten_respon.*, tbl_kat_respon.tipe_respon FROM tbl_konten_respon INNER JOIN tbl_kat_respon ON tbl_konten_respon.id_kat_respon = tbl_kat_respon.id WHERE tbl_kat_respon.tipe_respon=?",[cat],function (err,rows,fields){
			if(rows.length != 0){
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
