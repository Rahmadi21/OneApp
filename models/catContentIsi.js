var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCat : function (req, callback){

	var id = req.query.id;
	var cat = req.params.cat;
	if(id){

		knex('tbl_konten')
		.join('tbl_kat_konten','tbl_konten.id_kat_konten','tbl_kat_konten.id')
		.join('tbl_user','tbl_konten.id_user','tbl_user.id')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.whereRaw('tbl_kat_konten.konten=? AND tbl_konten.id=?',[cat,id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else{
		knex('tbl_konten')
		.join('tbl_kat_konten','tbl_konten.id_kat_konten','tbl_kat_konten.id')
		.join('tbl_user','tbl_konten.id_user','tbl_user.id')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.whereRaw('tbl_kat_konten.konten = ?',[cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},
	
	postCat : function (req, callback){
	var Id = uuID.v4();
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status.toString();

			knex('tbl_konten')
			.insert({
				'id':Id,
				'id_kat_konten':Id_Kat_Konten,
				'id_user':Id_User,
				'tgl_posting':Tgl_Posting,
				'judul':Judul,
				'isi':Isi,
				'status':Status
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	},

	putCat : function (req, callback){
	var Id = req.body.id;
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;

			knex('tbl_konten')
			.where('id',Id)
			.update({
				'id_kat_konten':Id_Kat_Konten,
				'id_user':Id_User,
				'tgl_posting':Tgl_Posting,
				'judul':Judul,
				'isi':Isi,
				'status':Status
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	},

	deleteCat : function (req, callback){
	var id = req.params.id;

		knex('tbl_konten')
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