var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatResponse : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	connection.query("SELECT * from tbl_kat_respon", function (err, rows, fields){
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
	,

	postCatResponse :function (req, res){
	
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && tipe_respon){
			connection.query("INSERT INTO tbl_kat_respon VALUES(?,?)",[id, tipe_respon], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, tipe_respon)";
		res.json(data);


		}

	}
	,

	putCatResponse  :function (req, res){
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && tipe_respon){
			connection.query("UPDATE tbl_kat_respon SET tipe_respon=? WHERE id=?",[tipe_respon, id], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error mengupdate data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil di update";
				}
			
			res.json(data);
		});
		
		}
		else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, tipe_respon)";
		res.json(data);


		}

	}
	,

	deleteCatResponse :function (req, res){
		var id = req.body.id;
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_kat_respon WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_kat_respon"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_kat_respon"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}
