var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getCatResponse : function(callback){

	knex.select().from('tbl_kat_respon')
	.then(function (rows){
		callback(null, rows);
	})
	.catch(function (err){
		callback(err)
	});

},

	postCatResponse :function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

			knex('tbl_kat_respon')
			.insert({
				'id':id,
				'tipe_respon':tipe_respon
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
		
	}
	,

	putCatResponse  :function(req, callback){
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

			knex('tbl_kat_respon')
			.where('id',id)
			.update({
				'tipe_respon':tipe_respon
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});

	}
	,

	deleteCatResponse :function(req, callback){
		var id = req.params.id;
		
		knex('tbl_kat_respon')
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
