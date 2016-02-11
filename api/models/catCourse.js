var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getCatCourse : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.kategori;
	if(id){
	connection.query("select tbl_nama_pelajaran.* ,tbl_kat_pelajaran.nama_kat as kategori, tbl_konten.judul as jurusan from tbl_nama_pelajaran inner join tbl_konten on tbl_nama_pelajaran.id_konten = tbl_konten.id inner join tbl_kat_pelajaran on tbl_nama_pelajaran.id_kategori = tbl_kat_pelajaran.id WHERE tbl_kat_pelajaran.nama_kat=?",[id], function (err, rows, fields){
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
	connection.query("SELECT * from tbl_kat_pelajaran", function (err, rows, fields){
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
	postCatCourse :function (req,res){
	var id = uuid.v4();
	var nama_kat = req.body.nama_kat;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!nama_kat){
		connection.query("INSERT into tbl_kat_pelajaran values(?,?)",[id,nama_kat],function (err, rows, fields){
			if(!!err){
				data["Data"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Data"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Data"] = "Please provide all required data (i.e : id, nama_kat)";
		res.json(data);
	}
},
	putCatCourse  :function (req, res){
		var id = req.body.id || uuid.v4();
		var nama_kat = req.body.nama_kat;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && nama_kat){
			connection.query("UPDATE tbl_kat_pelajaran SET nama_kat=? WHERE id=?",[nama_kat, id], function (err, rows, fields){
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
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, jabatan)";
		res.json(data);


		}

	},
	deleteCatCourse : function (req, res){
		var id = req.body.id || uuid.v4();
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_kat_pelajaran WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_kat_pelajaran"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_kat_pelajaran"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}

