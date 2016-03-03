var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCatContent : function (callback){
	knex.select().from('tbl_kat_konten')
	.then(function (rows){
			callback(null, rows);
	})
	.catch(function (err){
		callback(err);
	})
		

	},


	postCatContent : function (req, callback){
	
		var id = req.body.id || uuid.v4();
		var konten = req.body.konten;

			knex('tbl_kat_konten')
			.insert({
				'id':id,
				'konten':konten
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			})
		
			
}
	,

	putCatContent  : function (req, callback){
		var id = req.body.id;
		var konten = req.body.konten;
		
			knex('tbl_kat_konten')
			.where('id',id)
			.update({
				'konten':konten
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			})
		
		

	}
	,

	deleteCatContent : function (req, callback){
		var id = req.params.id;
			knex('tbl_kat_konten')
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
