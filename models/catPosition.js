var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCatPosition : function(req, callback){

	var jabatan = req.query.jabatan;

	knex.select().from('tbl_kat_jabatan').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	

},

	postCatPosition : function(req, callback){
	
		var id = req.body.id;
		var jabatan = req.body.jabatan;

		if(id && jabatan){
		
			knex('tbl_kat_jabatan')
			.insert(knex.raw('values(?,?)',[id,jabatan]))
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

	},

	putCatPosition  : function(req, callback){
		var id = req.body.id || uuid.v4();
		var jabatan = req.body.jabatan;
		if(id && jabatan){
			
			knex.raw("UPDATE tbl_kat_jabatan SET jabatan=? WHERE id=?",[jabatan, id])
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

	},

	deleteCatPosition : function(req, callback){
		var id = req.body.id;

		if(!!id){
			knex('tbl_kat_jabatan')
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
