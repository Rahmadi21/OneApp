var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getPrestation : function (callback){
	connection.query("SELECT * from tbl_prestasi", function (err, rows, fields){
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
			connection.query("INSERT INTO tbl_jabatan VALUES(?,?,?,?)",[id, id_konten, tingkat, peserta], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
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
			connection.query("UPDATE tbl_prestasi SET id_konten=?, tingkat=?, peserta=? WHERE id=?",[id_konten, tingkat, peserta, id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
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
			connection.query("DELETE FROM tbl_prestasi WHERE id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
			});

			
		}else{
			console.log("error");
			}
	}
}
