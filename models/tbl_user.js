var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var controller = {
	getuser: function (req, callback){

	var cat = req.query.kategori;
	var email = req.query.email;
	var pass  = req.query.password;
	if(cat && !email && !pass){
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.id', 'tbl_user.id_kat_user', 'tbl_user.email', 'tbl_user.username', 'tbl_user.nama_asli', 'tbl_user.tgl_lahir', 'tbl_user.pekerjaan', 'tbl_user.foto_profile', 'tbl_user.jurusan_favorite', 'tbl_user.reputasi','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_kat_user.kategori = ?',[cat])
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
		});	
	}
	else if(!cat && email && !pass){
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.id', 'tbl_user.id_kat_user', 'tbl_user.email', 'tbl_user.username', 'tbl_user.nama_asli', 'tbl_user.tgl_lahir', 'tbl_user.pekerjaan', 'tbl_user.foto_profile', 'tbl_user.jurusan_favorite', 'tbl_user.reputasi','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_user.email = ?',[email])
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
		});	
	}
	else if(!cat && email && pass){
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.id', 'tbl_user.id_kat_user', 'tbl_user.email', 'tbl_user.username', 'tbl_user.nama_asli', 'tbl_user.tgl_lahir', 'tbl_user.pekerjaan', 'tbl_user.foto_profile', 'tbl_user.jurusan_favorite', 'tbl_user.reputasi','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_user.email = ? AND tbl_user.password = ?',[email,pass])
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
		});	
	}
	else{
	knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.id', 'tbl_user.id_kat_user', 'tbl_user.email', 'tbl_user.username', 'tbl_user.nama_asli', 'tbl_user.tgl_lahir', 'tbl_user.pekerjaan', 'tbl_user.foto_profile', 'tbl_user.jurusan_favorite', 'tbl_user.reputasi','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
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

			knex('tbl_user')
			.insert({
				'id':id,
				'id_kat_user':id_kat_user,
				'email':email,
				'username':username,
				'password':password,
				'nama_asli':nama_asli,
				'tgl_lahir':tgl_lahir,
				'pekerjaan':pekerjaan,
				'foto_profile':foto_profile,
				'jurusan_favorite':jurusan_favorite,
				'reputasi':reputasi
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
		
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
		
			knex('tbl_user')
			.where('id',id)
			.update({
				'id_kat_user':id_kat_user,
				'email':email,
				'username':username,
				'password':password,
				'nama_asli':nama_asli,
				'tgl_lahir':tgl_lahir,
				'pekerjaan':pekerjaan,
				'foto_profile':foto_profile,
				'jurusan_favorite':jurusan_favorite,
				'reputasi':reputasi
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
		
	},

	deleteUser : function (req, callback){
			var id = req.body.id;
			
			knex('tbl_user')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});

		},

	getCatUser : function (req,callback){

		var id = req.params.id;
		knex('tbl_user')
		.join('tbl_kat_user','tbl_user.id_kat_user','tbl_kat_user.id')
		.leftJoin('tbl_konten','tbl_konten.id','tbl_user.jurusan_favorite')
		.select('tbl_user.*','tbl_konten.judul as jurusan_favorite', 'tbl_kat_user.kategori')
		.whereRaw('tbl_user.id = ?',[id])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}

}
module.exports = controller;

