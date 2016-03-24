var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getContent : function (req,callback){

	var id = req.query.id;
	if(id){
	
		knex('tbl_konten')
		.leftJoin('tbl_kat_konten','tbl_kat_konten.id','tbl_konten.id_kat_konten')
		.leftJoin('tbl_user','tbl_user.id','tbl_konten.id_user')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.whereRaw('tbl_konten.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else{
	knex('tbl_konten')
		.leftJoin('tbl_kat_konten','tbl_kat_konten.id','tbl_konten.id_kat_konten')
		.leftJoin('tbl_user','tbl_user.id','tbl_konten.id_user')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},
	
	postContent : function(req,callback){

	var Id = uuID.v4();
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status.toString();
	var data = {
				'id':Id,
				'id_kat_konten':Id_Kat_Konten,
				'id_user':Id_User,
				'tgl_posting':Tgl_Posting,
				'judul':Judul,
				'isi':Isi,
				'status':Status
	}
		
		knex('tbl_konten')
			.insert(data)
			.then(function (rows){
					callback(null, data);
			
		})
			.catch(function (err){
				callback(err)
			})
	},

	putContent : function(req,callback){
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

	deleteContent : function(req,callback){
	var Id = req.body.id;

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