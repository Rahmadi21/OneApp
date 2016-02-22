var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var konten      = require('./content.js');

module.exports = {
	getPrestation : function (req, callback){
	var id= req.query.id;
	var konten = req.query.konten;
	var peserta= req.query.peserta;

	if(id && !konten && !peserta){
	knex('tbl_prestasi')
	.join('tbl_prestasi_pivot','tbl_prestasi.id_konten','tbl_prestasi_pivot.id_konten')
	.join('tbl_peserta_prestasi','tbl_prestasi_pivot.id_peserta','tbl_peserta_prestasi.id')
	.select('tbl_prestasi.*','tbl_peserta_prestasi.peserta')
	.where('tbl_prestasi.id',id)
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && konten && !peserta){
	knex('tbl_prestasi')
	.join('tbl_prestasi_pivot','tbl_prestasi.id_konten','tbl_prestasi_pivot.id_konten')
	.join('tbl_peserta_prestasi','tbl_prestasi_pivot.id_peserta','tbl_peserta_prestasi.id')
	.select('tbl_prestasi.*','tbl_peserta_prestasi.peserta')
	.where('tbl_prestasi.id_konten',konten)
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !konten && peserta){
	knex('tbl_prestasi')
	.join('tbl_prestasi_pivot','tbl_prestasi.id_konten','tbl_prestasi_pivot.id_konten')
	.join('tbl_peserta_prestasi','tbl_prestasi_pivot.id_peserta','tbl_peserta_prestasi.id')
	.select('tbl_prestasi.*','tbl_peserta_prestasi.peserta')
	.where('tbl_peserta_prestasi.peserta',peserta)
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{
	knex('tbl_prestasi')
	.join('tbl_prestasi_pivot','tbl_prestasi.id_konten','tbl_prestasi_pivot.id_konten')
	.join('tbl_peserta_prestasi','tbl_prestasi_pivot.id_peserta','tbl_peserta_prestasi.id')
	.select('tbl_prestasi.*','tbl_peserta_prestasi.peserta')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}

	},

	postPrestation : function(req, callback){
		var id = req.body.id || uuid.v4();
		var tingkat = req.body.tingkat;
		var tempat = req.body.tempat;
		var peserta = req.body.id_peserta;

			konten.postContent(req,function (err,result_konten){
				knex('tbl_prestasi')
				.insert({
					'id':id,
					'id_konten':result_konten.id,
					'tingkat':tingkat,
					'tempat':tempat
				})
				.then(function (result){
					knex('tbl_prestasi_pivot')
					.insert({
						'id':id,
						'id_konten':result_konten,
						'id_peserta':peserta
					})
					.then(function (){
						callback(null, result);	
					})
					
				})
				.catch(function (error){
					callback(error)
				})
			})
		
			
		
	},

	putPrestation : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var tingkat = req.body.tingkat;
		var tempat = req.body.tempat;

			knex('tbl_prestasi')
			.where('id',id)
			.update({
				'id_konten':id_konten,
				'tingkat':tingkat,
				'tempat':tempat
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
		
	},

	deletePrestation : function(req, callback){
		var id = req.body.id;

			knex('tbl_prestasi')
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
