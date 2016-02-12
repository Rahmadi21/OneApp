var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getContentPhoto : function(req, callback){

	var id = req.query.id_konten;
	if(id){
	connection.query("SELECT * from tbl_foto where id_konten=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_foto", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postContentPhoto : function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;

		if(id && id_konten && foto){
			connection.query("INSERT INTO tbl_foto VALUES(?,?,?)",[id, id_konten, foto], function (err, rows, fields){
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

	putContentPhoto  : function(req, callback){
	
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;


			if(id && id_konten && foto){
			connection.query("UPDATE tbl_foto SET id_konten=?, foto=? WHERE id=?",[id_konten, foto, id], function (err, rows, fields){
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

	deleteContentPhoto :  function(req, callback){
		var id = req.body.id;

		if(!!id){
			connection.query("DELETE FROM tbl_foto WHERE id=?",[id], function (err, rows, fields){
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
