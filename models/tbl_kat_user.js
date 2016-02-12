var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getKatUser : function (req, callback){

	var id = req.query.id;
	if(id){
	connection.query("SELECT * from tbl_kat_user where id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows)
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_kat_user", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows)
			}
		});
	}

},

	postKatUser : function (req, callback){
	
		var id = req.body.id;
		var kategori = req.body.kategori;

		if(id && kategori){
			connection.query("INSERT INTO tbl_kat_user VALUES(?,?)",[id, kategori], function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null,rows)
				}
		
			});
		
			}
			else{
				console.log("error");
		}
	},

	putKatUser : function (req, callback){
		var id = req.body.id;
		var kategori = req.body.kategori;

		if(id && kategori){
			connection.query("UPDATE tbl_kat_user SET kategori=? WHERE id=?",[kategori, id], function (err, rows, fields){
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

	deleteKatUser : function (req, callback){
		var id = req.body.id;

		if(id){
			connection.query("DELETE FROM tbl_kat_user WHERE id=?",[id], function (err, rows, fields){
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