var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports= {
	getuser: function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	connection.query("SELECT * from tbl_user", function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});
},

	postUser : function (req, res){
		var id = uuid.v4();
		var id_kat_user = req.body.id_kat_user;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var nama_asli = req.body.nama_asli;
		var tgl_lahir = req.body.tgl_lahir;
		var pekerjaan = req.body.pekerjaan;
		var foto_profile = req.body.foto_profile;
		var jurusan_favorite = req.body.jurusan_favorite;
		var reputasi = req.body.reputasi;
		var data = {
			"error":1,
			"one_app":""
		};



		if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
			connection.query("INSERT INTO tbl_user VALUES(?,?,?,?,?,?,?,?,?,?,?)",[id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi], function(err, rows, fields){
				if(!!err){
					data["one_app"] = "Error dalam menambahkan data";	
				}else{
					data["error"] = 0;
					data["one_app"] = "User berhasil ditambahkan";		
				}
				res.json(data);
			});
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi)";
			res.json(data);

			}
	},

	putUser : function (req, res){
			
			var id = req.body.id;
			var id_kat_user = req.body.id_kat_user;
			var email = req.body.email;
			var username = req.body.username;
			var password = req.body.password;
			var nama_asli = req.body.nama_asli;
			var tgl_lahir = req.body.tgl_lahir;
			var pekerjaan = req.body.pekerjaan;
			var foto_profile = req.body.foto_profile;
			var jurusan_favorite = req.body.jurusan_favorite;
			var reputasi = req.body.reputasi;
			var data = {
				"error":1,
				"one_app":""
			};
			if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
			connection.query("UPDATE tbl_user SET id_kat_user=?, email=?, username=?, password=?, nama_asli=?, tgl_lahir=?, pekerjaan=?, foto_profile=?, jurusan_favorite=?, reputasi=? WHERE id=?",[id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi, id], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "Error mengupdate data";	
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil diupdate";		
				}
				res.json(data);
			});
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi)";
			res.json(data);

		}
	},

	deleteUser : function (req, res){
			var id = req.body.id;
			var data = {
				"error":1,
				"one_app":""
			};
			if(!!id){
				connection.query("DELETE FROM tbl_user WHERE id=?",[id], function (err, rows, fields){
					if(!!err){
						data["tbl_user"] = err;
					}else{
						data["error"] = 0;
						data["tbl_user"] = " Delete user sukses";

					}
					res.json(data);
					
				});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
		}

}


