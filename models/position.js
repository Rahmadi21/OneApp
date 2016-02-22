var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var konten      = require('./content.js');

module.exports = {
	getPosition : function(req, callback){

	var id = req.query.id;
	var jabatan= req.query.jabatan;
	var konten = req.query.konten;
	if(id && !jabatan && !konten){

		knex('tbl_jabatan')
		.join('tbl_kat_jabatan','tbl_kat_jabatan.id','tbl_jabatan.id_kat_jabatan')
		.select('tbl_jabatan.id', 'tbl_jabatan.id_konten','tbl_jabatan.id_kat_jabatan' ,'tbl_kat_jabatan.jabatan', 'tbl_jabatan.nama', 'tbl_jabatan.bidang')
		.whereRaw('tbl_jabatan.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && jabatan && !konten){
		knex('tbl_jabatan')
		.join('tbl_kat_jabatan','tbl_kat_jabatan.id','tbl_jabatan.id_kat_jabatan')
		.select('tbl_jabatan.id', 'tbl_jabatan.id_konten','tbl_jabatan.id_kat_jabatan' , 'tbl_kat_jabatan.jabatan', 'tbl_jabatan.nama', 'tbl_jabatan.bidang')
		.whereRaw('tbl_kat_jabatan.jabatan= ?',[jabatan])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !jabatan && konten){
	knex('tbl_jabatan')
		.join('tbl_kat_jabatan','tbl_kat_jabatan.id','tbl_jabatan.id_kat_jabatan')
		.select('tbl_jabatan.id', 'tbl_jabatan.id_konten','tbl_jabatan.id_kat_jabatan' , 'tbl_kat_jabatan.jabatan', 'tbl_jabatan.nama', 'tbl_jabatan.bidang')
		.whereRaw('tbl_jabatan.id_konten = ?',[id_konten])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{
	knex('tbl_jabatan')
		.join('tbl_kat_jabatan','tbl_kat_jabatan.id','tbl_jabatan.id_kat_jabatan')
		.select('tbl_jabatan.id', 'tbl_jabatan.id_konten','tbl_jabatan.id_kat_jabatan' , 'tbl_kat_jabatan.jabatan', 'tbl_jabatan.nama', 'tbl_jabatan.bidang')
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},

	postPosition : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;

			konten.postContent(req,function (err,result){
			knex('tbl_jabatan')
			.insert({
				'id':id,
				'id_konten':result.id,
				'id_kat_jabatan':id_kat_jabatan,
				'nama':result.judul,
				'bidang':bidang
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
			})
			
		
		
	},

	putPosition : function(req, callback){
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;

			knex('tbl_jabatan')
			.where('id',id)
			.update({
				'id_konten':id_konten,
				'id_kat_jabatan':id_kat_jabatan,
				'nama':nama,
				'bidang':bidang
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
		
		
	},

	deletePosition : function(req, callback){
		var id = req.body.id;

			knex('tbl_jabatan')
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
