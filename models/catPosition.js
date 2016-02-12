var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);


module.exports = {
	getCatPosition : function(req, callback){

	var bagian = req.query.bagian;
	if(bagian){
	connection.query("select tbl_jabatan.* , tbl_kat_jabatan.jabatan from tbl_jabatan inner join tbl_kat_jabatan ON tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id WHERE tbl_kat_jabatan.jabatan=?",[bagian], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_kat_jabatan", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postCatPosition : function(req, callback){
	
		var id = req.body.id;
		var jabatan = req.body.jabatan;

		if(id && jabatan){
			connection.query("INSERT INTO tbl_kat_jabatan VALUES(?,?)",[id, jabatan], function (err, rows, fields){
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

	putCatPosition  : function(req, callback){
		var id = req.body.id || uuid.v4();
		var jabatan = req.body.jabatan;
		if(id && jabatan){
			connection.query("UPDATE tbl_kat_jabatan SET jabatan=? WHERE id=?",[jabatan, id], function (err, rows, fields){
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

	deleteCatPosition : function(req, callback){
		var id = req.body.id;
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_kat_jabatan WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_kat_jabatan"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_kat_jabatan"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}
