var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getCatCourse : function(req,callback){

	var id = req.query.kategori;

		knex.select().from('tbl_kat_pelajaran')
		.then(function (rows){
			callback(null, rows);
		})
		.catch(function (err){
			callback(err)
		});

},
	postCatCourse :function (req,callback){
	var id = uuid.v4();
	var nama_kat = req.body.nama_kat;

			knex('tbl_kat_pelajaran')
			.insert({
				'id':id,
				'nama_kat':nama_kat
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
},
	putCatCourse  :function(req,callback){
		var id = req.body.id || uuid.v4();
		var nama_kat = req.body.nama_kat;
			
			knex('tbl_kat_pelajaran')
			.where('id',id)
			.update({
				'nama_kat':nama_kat
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	

	},
	deleteCatCourse : function(req,callback){
		var id = req.body.id || uuid.v4();
		
		knex('tbl_kat_pelajaran')
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

