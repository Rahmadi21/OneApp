var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getPesertaPrestasi : function (req, callback){

	var id = req.query.id;
	if(id){
		knex('tbl_peserta_prestasi')
		.select()
		.whereRaw('tbl_peserta_prestasi.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{

		knex('tbl_peserta_prestasi')
		.select()
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}


},

	postPesertaPrestasi : function(req, callback) {
	var Id = uuID.v4();
	var peserta = req.body.peserta;
	var data = {
		'id':Id,
		'peserta':peserta
	}
			knex('tbl_peserta_prestasi')
			.insert(data)
			.then(function (rows){
				callback(null, data);
			})
			.catch(function (err){
				callback(err)
			});
	
}

	,

	putPesertaPrestasi  : function(req, callback){
	var Id = uuID.v4();
	var peserta = req.body.peserta;

			knex('tbl_peserta_prestasi')
			.where('id',id)
			.update({
				'peserta':peserta
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
	}

	,

	deletePesertaPrestasi : function(req, callback){
	var id = req.params.id;

			knex('tbl_peserta_prestasi')
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
