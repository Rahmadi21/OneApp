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
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	}
	else{
		knex.select().from('tbl_kat_user').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	}

},

	postKatUser : function (req, callback){
	
		var id = req.body.id || uuid.v4();
		var kategori = req.body.kategori;

		if(id && kategori){
			knex('tbl_kat_user')
			.insert(knex.raw('values(?,?)',[id,kategori]))
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

	putKatUser : function (req, callback){
		var id = req.body.id;
		var kategori = req.body.kategori;

		if(id && kategori){
			knex.raw("UPDATE tbl_kat_user SET kategori=? WHERE id=?",[kategori, id])
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

	deleteKatUser : function (req, callback){
		var id = req.body.id;

		if(id){
			knex('tbl_kat_user')
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