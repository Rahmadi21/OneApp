var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatCourse : function(req,callback){

	var id = req.query.kategori;
	if(id){
	connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id WHERE tbl_kat_pelajaran.nama_kat=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_kat_pelajaran", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},
	postCatCourse :function (req,callback){
	var id = uuid.v4();
	var nama_kat = req.body.nama_kat;

	if(id && nama_kat){
		connection.query("INSERT into tbl_kat_pelajaran values(?,?)",[id,nama_kat],function (err, rows, fields){
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
	putCatCourse  :function(req,callback){
		var id = req.body.id || uuid.v4();
		var nama_kat = req.body.nama_kat;

		if(id && nama_kat){
			connection.query("UPDATE tbl_kat_pelajaran SET nama_kat=? WHERE id=?",[nama_kat, id], function (err, rows, fields){
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
	deleteCatCourse : function(req,callback){
		var id = req.body.id || uuid.v4();
		
		if(!!id){
			connection.query("DELETE FROM tbl_kat_pelajaran WHERE id=?",[id], function (err, rows, fields){
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

