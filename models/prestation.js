var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getPrestation : function (callback){
	knex.select().from('tbl_prestasi').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	},

	postPrestation : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var tingkat = req.body.tingkat;
		var peserta = req.body.peserta;

		if(id && id_konten && tingkat && peserta){
			knex('tbl_prestasi')
			.insert(knex.raw('VALUES(?,?,?,?)',[id, id_konten, tingkat, peserta]))
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

	putPrestation : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var tingkat = req.body.tingkat;
		var peserta = req.body.peserta;

		if(id && id_konten && tingkat && peserta){
			knex.raw("UPDATE tbl_prestasi SET id_konten=?, tingkat=?, peserta=? WHERE id=?",[id_konten, tingkat, peserta, id])
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

	deletePrestation : function(req, callback){
		var id = req.body.id;

		if(!!id){
			knex('tbl_prestasi')
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
