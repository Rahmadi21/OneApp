var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatResponse : function(req, callback){

	var id = req.query.kategori;
	if(id){
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_kat_respon.tipe_respon=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

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
