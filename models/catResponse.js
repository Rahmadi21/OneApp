var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatResponse : function(callback){

	connection.query("SELECT * FROM tbl_kat_respon", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});


},

	postCatResponse :function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

		if(id && tipe_respon){
			connection.query("INSERT INTO tbl_kat_respon VALUES(?,?)",[id, tipe_respon], function (err, rows, fields){
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
	,

	putCatResponse  :function(req, callback){
		var id = req.body.id || uuid.v4();
		var tipe_respon = req.body.tipe_respon;

		if(id && tipe_respon){
			connection.query("UPDATE tbl_kat_respon SET tipe_respon=? WHERE id=?",[tipe_respon, id], function (err, rows, fields){
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

	}
	,

	deleteCatResponse :function(req, callback){
		var id = req.body.id;
		
		if(!!id){
			connection.query("DELETE FROM tbl_kat_respon WHERE id=?",[id], function (err, rows, fields){
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
