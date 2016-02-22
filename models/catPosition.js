var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCatPosition : function(req, callback){

	var jabatan = req.query.jabatan;

	knex.select().from('tbl_kat_jabatan')
	.then(function (rows){
		callback(null, rows);
	})
	.catch(function (err){
		callback(err)
	});

},

	postCatPosition : function(req, callback){
	
		var id = req.body.id;
		var jabatan = req.body.jabatan;

			knex('tbl_kat_jabatan')
			.insert({
				'id':id,
				'jabatan':jabatan
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
		

	},

	putCatPosition  : function(req, callback){
		var id = req.body.id || uuid.v4();
		var jabatan = req.body.jabatan;
		
			knex('tbl_kat_jabatan')
			.where('id',id)
			.update({
				'jabatan':jabatan
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});

	},

	deleteCatPosition : function(req, callback){
		var id = req.body.id;

		knex('tbl_kat_jabatan')
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
