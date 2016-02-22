var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getKatUser : function (req, callback){

	var id = req.query.id;
	if(id){
		knex.select()
		.from('tbl_kat_konten')
		.whereRaw("id=?",[id])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}
	else{
		knex.select().from('tbl_kat_user')
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}

},

	postKatUser : function (req, callback){
	
		var id = req.body.id || uuid.v4();
		var kategori = req.body.kategori;

			knex('tbl_kat_user')
			.insert({
				'id':id,
				'kategori':kategori
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
		
			
		
	}
	,

	putKatUser : function (req, callback){
		var id = req.body.id;
		var kategori = req.body.kategori;

			knex('tbl_kat_user')
			.where('id',id)
			.update({
				'kategori':kategori
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
		
		
	},

	deleteKatUser : function (req, callback){
		var id = req.body.id;

			knex('tbl_kat_user')
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