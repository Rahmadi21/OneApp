var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getKatUser : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id;
	if(id){
	connection.query("SELECT * from tbl_kat_user where id=?",[id], function (err, rows, fields){
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
	connection.query("SELECT * from tbl_kat_user", function (err, rows, fields){
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

	postKatUser : function (req, res){
	
		var id = req.body.id;
		var kategori = req.body.kategori;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && kategori){
			connection.query("INSERT INTO tbl_kat_user VALUES(?,?)",[id, kategori], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, kategori)";
		res.json(data);


		}
	},

	putKatUser : function (req, res){
		var id = req.body.id;
		var kategori = req.body.kategori;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && kategori){
			connection.query("UPDATE tbl_kat_user SET kategori=? WHERE id=?",[kategori, id], function (err, rows, fields){
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
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, kategori)";
		res.json(data);


		}
	},

	deleteKatUser : function (req, res){
		var id = req.body.id;
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_kat_user WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_kat_user"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_kat_user"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}