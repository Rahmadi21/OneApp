var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCatContent : function (callback){
	knex.select().from('tbl_kat_konten').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});

	},


	postCatContent : function (req, callback){
	
		var id = req.body.id || uuid.v4();
		var konten = req.body.konten;

		if(id && konten){
			//dari sini di
			knex('tbl_kat_konten')
			.insert(knex.raw('values(?,?)',[id,konten]))
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
			//sampe sini
			
	});
		
			}else{
			console.log("error");
		}
}
	,

	putCatContent  : function (req, callback){
		var id = req.body.id;
		var konten = req.body.konten;
		if(id && konten){
			knex.raw("update tbl_kat_konten set konten=? WHERE id=?",[konten,id])
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

	deleteCatContent : function (req, callback){
		var id = req.body.id;
		if(id){
			knex('tbl_kat_konten')
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
