var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getPosition : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id;
	var jabatan= req.query.jabatan;
	var konten = req.query.konten;
	if(id && !jabatan && !konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_jabatan.id=?",[id], function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});	
	}
	else if(!id && jabatan && !konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_kat_jabatan.jabatan=?",[jabatan], function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});	
	}
	else if(!id && !jabatan && konten){
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id where tbl_jabatan.id_konten=?",[konten], function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});	
	}
	else{
	connection.query("SELECT tbl_jabatan.id, tbl_jabatan.id_konten, tbl_kat_jabatan.jabatan, tbl_jabatan.nama, tbl_jabatan.bidang from tbl_jabatan INNER JOIN tbl_kat_jabatan on tbl_jabatan.id_kat_jabatan = tbl_kat_jabatan.id", function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});
	}

},

	postPosition : function (req, res){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && id_konten && id_kat_jabatan && nama && bidang){
			connection.query("INSERT INTO tbl_jabatan VALUES(?,?,?,?,?)",[id, id_konten, id_kat_jabatan, nama, bidang], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_konten, id_kat_jabatan, nama, bidang)";
		res.json(data);


		}
	},

	putPosition : function (req, res){
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var id_kat_jabatan = req.body.id_kat_jabatan;
		var nama = req.body.nama;
		var bidang = req.body.bidang;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && id_konten && id_kat_jabatan && nama && bidang){
			connection.query("UPDATE tbl_jabatan SET id_konten=?, id_kat_jabatan=?, nama=?, bidang=? WHERE id=?",[id_konten, id_kat_jabatan, nama, bidang, id], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error mengupdate data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil di update";
				}
			
			res.json(data);
		});
		
		}
		else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_konten, id_kat_jabatan, nama, bidang)";
		res.json(data);


		}
	},

	deletePosition : function (req, res){
		var id = req.body.id;
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_jabatan WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_jabatan"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_jabatan"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}
