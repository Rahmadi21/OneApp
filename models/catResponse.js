var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getCatResponse : function(callback){

	knex.select().from('tbl_kat_respon').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});


},

	postCatResponse :function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

		if(id && tipe_respon){
			
			knex('tbl_kat_respon')
			.insert(knex.raw('values(?,?)',[id,tipe_respon]))
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
	});
		
			}else{
			console.log("error");
		}

	}
	,

	putCatResponse  :function(req, callback){
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

		if(id && tipe_respon){

			knex.raw("UPDATE tbl_kat_respon SET tipe_respon=? WHERE id=?",[tipe_respon, id])
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
		
		}
		else{
			console.log("error");
		}

	}
	,

	deleteCatResponse :function(req, callback){
		var id = req.body.id;
		
		if(!!id){
			knex('tbl_kat_respon')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}		
			});

			
		}else{
			console.log("error");
			}
	}
}
