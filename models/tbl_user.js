var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var controller = {
	getuser: function (req, callback){

	var cat = req.query.kategori;
	if(cat){
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.*','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_kat_user.kategori = ?',[cat])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else{
	knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.*','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

}
,

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

			knex('tbl_user')
			.insert(knex.raw('VALUES(?,?,?,?,?,?,?,?,?,?,?)',[id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi]))
			.then(function (err, rows, fields){
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

			knex.raw("UPDATE tbl_user SET id_kat_user=?, email=?, username=?, password=?, nama_asli=?, tgl_lahir=?, pekerjaan=?, foto_profile=?, jurusan_favorite=?, reputasi=? WHERE id=?",[id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi, id])
			.then(function (err, rows, fields){
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
			knex('tbl_user')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (err, rows, fields){
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

	getCatUser : function (req,callback){

		var id = req.params.id;
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.*','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_user.id = ?',[id])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

}
module.exports = controller;

