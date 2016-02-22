var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {

	getResponse : function (req, callback){
	
	var id = req.query.id;
	var cat = req.query.kategori;
	var id_konten = req.query.konten;
	if(id && !cat && !id_konten){

	knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_konten_respon.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && cat && !id_konten){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_kat_respon.tipe_respon = ?',[cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && cat && id_konten){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_konten_respon.id_konten = ? AND tbl_kat_respon.tipe_respon=?',[id_konten,cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !cat && id_konten){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_konten_respon.id_konten = ?',[id_konten])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(id && cat && !id_konten){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_konten_respon.id = ? AND tbl_kat_respon.tipe_respon=?',[id,cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(id && cat && id_konten){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_konten_respon.id = ? AND tbl_konten_respon.id_konten = ? AND tbl_kat_respon.tipe_respon=?',[id,id_konten,cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},

	postResponse : function(req, callback){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;

			knex('tbl_konten_pivot')
			.insert({
				'id':Id,
				'id_konten':Id_Konten,
				'id_kat_respon':Id_Kat_Respon,
				'id_user':Id_User,
				'tgl_respon':Tgl_Respon,
				'isi':isi
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

	,

	putResponse  : function(req, callback){
	var Id = req.body.id;
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;

	knex('tbl_konten_respon')
			.where('id',Id)
			.update({
				'id_konten':Id_Konten,
				'id_kat_respon':Id_Kat_Respon,
				'id_user':Id_User,
				'tgl_respon':Tgl_Respon,
				'isi':isi
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
}

	,

	deleteResponse : function(req, callback){
	var Id = req.body.id;
	
			knex('tbl_konten_respon')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
	}
}
