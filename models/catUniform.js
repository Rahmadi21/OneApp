var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getCatUniform : function (req, callback){

	var id = req.query.kategori;

	knex.select().from('tbl_kat_seragam')
	.then(function (rows){
		callback(null, rows);
	})
	.catch(function (err){
		callback(err)
	});
	

},

	postCatUniform : function(req,callback){
	var Id = uuID.v4();
	var Kategori = req.body.kategori;

	knex('tbl_kat_seragam')
			.insert({
				'id':Id,
				'kategori':Kategori
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});

}

	,

	putCatUniform  : function(req,callback){
	var Id = req.body.id;
	var Kategori = req.body.kategori;

			knex('tbl_kat_seragam')
			.where('id',Id)
			.update({
				'kategori':Kategori
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
}

	,

	deleteCatUniform : function(req,callback){
	var id = req.params.id;

	knex('tbl_kat_seragam')
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
