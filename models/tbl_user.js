var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
var controller = {
	getuser: function (req, callback){

	var cat = req.query.kategori;
	if(cat){
	connection.query("SELECT tbl_user.*,tbl_konten.judul as jurusan_favorite, tbl_kat_user.kategori FROM tbl_user INNER JOIN tbl_kat_user ON tbl_user.id_kat_user = tbl_kat_user.id left join tbl_konten on tbl_user.jurusan_favorite = tbl_konten.id WHERE tbl_kat_user.kategori=?",[cat], function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else{
	connection.query("SELECT tbl_user.*, tbl_konten.judul as jurusan_favorite,tbl_kat_user.kategori FROM tbl_user INNER JOIN tbl_kat_user ON tbl_user.id_kat_user = tbl_kat_user.id left join tbl_konten on tbl_user.jurusan_favorite = tbl_konten.id", function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

},

	postUser : function (req, callback){
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

		if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
			connection.query("INSERT INTO tbl_user VALUES(?,?,?,?,?,?,?,?,?,?,?)",[id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi], function(err, rows, fields){
				if(err){
					callback(err);	
				}else{
					callback(null, rows);
				}
			
			});
		}else{
				console.log("error");
			}
	},

	putUser : function (req, callback){
			
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
			
			if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
			connection.query("UPDATE tbl_user SET id_kat_user=?, email=?, username=?, password=?, nama_asli=?, tgl_lahir=?, pekerjaan=?, foto_profile=?, jurusan_favorite=?, reputasi=? WHERE id=?",[id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi, id], function (err, rows, fields){
				if(err){
					callback(err);	
				}else{
					callback(null, rows);
				}
			});
		}else{
			console.log("error");
		}
	},

	deleteUser : function (req, callback){
			var id = req.body.id;
			
			if(id){
				connection.query("DELETE FROM tbl_user WHERE id=?",[id], function (err, rows, fields){
					if(err){
						callback(err);
					}else{
						callback(null,rows)
					}
					
				});

			
		}else{
				console.log("error");
			}
		},

	getCatUser : function (req,callback){

		var id = req.params.id;
		connection.query("SELECT tbl_user.*, tbl_kat_user.kategori FROM tbl_user INNER JOIN tbl_kat_user ON tbl_user.id_kat_user = tbl_kat_user.id WHERE tbl_user.id=?",[id],function (err,rows,fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows)
			}
		});
	}

}
module.exports = controller;

