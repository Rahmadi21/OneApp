var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getCatCourse : function(req,callback){

	var id = req.query.kategori;

		knex.select().from('tbl_kat_pelajaran').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	

},
	postCatCourse :function (req,callback){
	var id = uuid.v4();
	var nama_kat = req.body.nama_kat;

	if(id && nama_kat){
	
			knex('tbl_kat_pelajaran')
			.insert(knex.raw('values(?,?)',[id,nama_kat]))
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
	putCatCourse  :function(req,callback){
		var id = req.body.id || uuid.v4();
		var nama_kat = req.body.nama_kat;

		if(id && nama_kat){
			
			knex.raw("UPDATE tbl_kat_pelajaran SET nama_kat=? WHERE id=?",[nama_kat, id])
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
	deleteCatCourse : function(req,callback){
		var id = req.body.id || uuid.v4();
		
		if(!!id){
			knex('tbl_kat_pelajaran')
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

