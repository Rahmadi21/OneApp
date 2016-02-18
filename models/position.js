var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);


module.exports = {
	getPosition : function(req, callback){

	var id = req.query.id;
	var jabatan= req.query.jabatan;
	var konten = req.query.konten;
	if(id && !jabatan && !konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_jabatan.id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && jabatan && !konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_kat_jabatan.jabatan=?",[jabatan], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !jabatan && konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_jabatan.id_konten=?",[konten], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postPosition : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;

		if(id && id_konten && id_kat_jabatan && nama && bidang){
			knex('tbl_jabatan')
			.insert(knex.raw('VALUES(?,?,?,?,?)',[id, id_konten, id_kat_jabatan, nama, bidang]))
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

	putPosition : function(req, callback){
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;

		if(id && id_konten && id_kat_jabatan && nama && bidang){
			knex.raw("UPDATE tbl_jabatan SET id_konten=?, id_kat_jabatan=?, nama=?, bidang=? WHERE id=?",[id_konten, id_kat_jabatan, nama, bidang, id])
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

	deletePosition : function(req, callback){
		var id = req.body.id;

		if(!!id){
			knex('tbl_jabatan')
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
