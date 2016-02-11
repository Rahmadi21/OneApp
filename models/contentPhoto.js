var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getContentPhoto : function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id_konten;
	if(id){
	connection.query("SELECT * from tbl_foto where id_konten=?",[id], function (err, rows, fields){
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
	connection.query("SELECT * from tbl_foto", function (err, rows, fields){
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

	postContentPhoto : function (req, res){
	
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;
		var data = {
			"error":1,
			"one_app":""
		};
		if(id && id_konten && foto){
			connection.query("INSERT INTO tbl_foto VALUES(?,?,?)",[id, id_konten, foto], function (err, rows, fields){
				if(!!err){
					data["one_app"] = "error dalam menambahkan data";
				}else{
					data["error"] = 0;
					data["one_app"] = "data berhasil ditambahkan";
				}
			
			res.json(data);
	});
		
			}else{
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_konten, foto)";
		res.json(data);


		}

	},

	putContentPhoto  : function (req, res){
	
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;
		var data = {
			"error":1,
			"one_app":""
		};

			if(id && id_konten && foto){
			connection.query("UPDATE tbl_foto SET id_konten=?, foto=? WHERE id=?",[id_konten, foto, id], function (err, rows, fields){
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
		data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_konten, foto)";
		res.json(data);


		}

	},

	deleteContentPhoto :  function (req, res){
		var id = req.body.id;
		var data = {
			"error":1,
			"one_app":""
		};
		if(!!id){
			connection.query("DELETE FROM tbl_foto WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_foto"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_foto"] = " Delete user sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}
