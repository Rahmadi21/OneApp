var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getResponseAttend : function (req, callback){
	var id = req.query.id
	var cat = req.params.cat;
	var kon = req.query.konten;
	if(id && !cat && !kon){
	
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_kat_respon.tipe_respon=? AND tbl_konten_respon.id=?',[cat,id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && !cat && kon){
		knex('tbl_konten_respon')
		.join('tbl_konten','tbl_konten.id','tbl_konten_respon.id_konten')
		.join('tbl_user','tbl_user.id','tbl_konten_respon.id_user')
		.join('tbl_kat_respon','tbl_kat_respon.id','tbl_konten_respon.id_kat_respon')
		.select('tbl_konten_respon.id','tbl_konten_respon.id_konten','tbl_konten.judul as konten', 'tbl_kat_respon.tipe_respon' , 'tbl_user.username', 'tbl_konten_respon.tgl_respon','tbl_konten_respon.isi')
		.whereRaw('tbl_kat_respon.tipe_respon=? AND tbl_konten.id=?',[cat,kon])
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
		.whereRaw('tbl_kat_respon.tipe_respon=?',[cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

}

	
}
