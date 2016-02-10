var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getCourse : function (req,res){
	var data = {
		"error":1,
		"Data":""
	};
	
	connection.query("SELECT * from tbl_nama_pelajaran",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Data"] = rows;
			res.json(data);
		}else{
			data["Data"] = 'No books Found..';
			res.json(data);
	}
	});
},

postCourse : function (req, res){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kategori = req.body.id_kategori;
		var nama_pelajaran = req.body.nama_pelajaran;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && id_konten && id_kategori && nama_pelajaran){
			connection.query("INSERT INTO tbl_nama_pelajaran VALUES(?,?,?,?)",[id, id_konten, id_kategori, nama_pelajaran], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_konten, id_kategori, nama_pelajaran)";
		res.json(data);


		}
	},	
putCourse  : function (req, res){

	var id = uuid.v4();
	var id_konten = req.body.id_konten;
	var id_kategori = req.body.id_kategori;
	var nama_pelajaran = req.body.nama_pelajaran;
	var data = {
		"error":1,
		"Data":""
	};
	if(!!id && !!id_konten && !!id_kategori && !!nama_pelajaran){
		connection.query("UPDATE tbl_nama_pelajaran SET id_konten=?, id_kategori=?, nama_pelajaran=? WHERE id=?",[id, id_konten, id_kategori, nama_pelajaran], function (err, rows, fileds){
			if (!!err){
				data["Data"] = "Error Updating Data";
			}else{
				data["error"] = 0;
				data["Data"] = "Updated Book Succesfully";
			}
			res.json(data);
		});
	}else {
		data["Data"] = "Please provide all required data (i.e : id, id_konten, id_kategori, nama_pelajaran)";
		res.json(data);
	}

},

	deleteCourse : function (req,res){
	var Id = req.body.id || uuid.v4();
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_nama_pelajaran WHERE id=?",[Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

}
