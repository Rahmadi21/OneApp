var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getCatPosition : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	connection.query("SELECT * from tbl_kat_jabatan", function (err, rows, fields){
		if(rows.length !=0){
			data["error"] = 0;
			data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}
		});

	},

	postCatPosition : function (req, res){
	
		var id = req.body.id;
		var jabatan = req.body.jabatan;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && jabatan){
			connection.query("INSERT INTO tbl_kat_jabatan VALUES(?,?)",[id, jabatan], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, jabatan)";
		res.json(data);


		}

	},

	putCatPosition  : function (req, res){
		var id = req.body.id;
		var jabatan = req.body.jabatan;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && jabatan){
			connection.query("UPDATE tbl_kat_jabatan SET jabatan=? WHERE id=?",[jabatan, id], function (err, rows, fields){
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

	deleteCatPosition : function (req, res){
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
