var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatContent : function (callback){
	connection.query("SELECT * from tbl_kat_konten", function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});

	},


	postCatContent : function (req, callback){
	
		var id = req.body.id;
		var konten = req.body.konten;

		if(id && konten){
			connection.query("INSERT INTO tbl_kat_konten VALUES(?,?)",[id, konten], function (err, rows, fields){
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

	putCatContent  : function (req, callback){
		var id = req.body.id;
		var konten = req.body.konten;
		if(id && konten){
			connection.query("UPDATE tbl_kat_konten SET konten=? WHERE id=?",[konten, id], function (err, rows, fields){
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

	deleteCatContent : function (req, callback){
		var id = req.body.id;
		if(id){
			connection.query("DELETE FROM tbl_kat_konten WHERE id=?",[id], function (err, rows, fields){
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
