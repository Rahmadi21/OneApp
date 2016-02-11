var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getReport :function (req, res){
	var data = {
		"error": 1,
		"one_app":""
	};
	var id = req.query.id;
	var pelapor = req.query.pelapor;
	var terlapor = req.query.terlapor;
	if(id && !pelapor && !terlapor){
	connection.query("SELECT * from tbl_report where id=?",[id], function (err, rows, fields){
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
	else if(!id && pelapor && !terlapor){
	connection.query("SELECT * from tbl_report where id_user_pelapor=?",[pelapor], function (err, rows, fields){
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
	else if(!id && !pelapor && terlapor){
	connection.query("SELECT * from tbl_report where id_user_terlapor=?",[terlapor], function (err, rows, fields){
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
	connection.query("SELECT * from tbl_report", function (err, rows, fields){
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

	postReport :function (req,res){
	var id = uuid.v4();
	var id_user_pelapor = req.body.id_user_pelapor;
	var id_user_terlapor = req.body.id_user_terlapor;
	var id_respon = req.body.id_respon;
	var status = req.body.status;
	var tgl_report = req.body.tgl_report;

	var data = {
		"error":1,
		"data":""
	};
	if(id && id_user_pelapor && id_user_terlapor && id_respon && status && tgl_report){
		connection.query("INSERT INTO tbl_report VALUES(?,?,?,?,?,?)",[id,id_user_pelapor,id_user_terlapor,id_respon,status,tgl_report],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["error"] = 0;
				data["data"] = "data berhasil ditambahkan";
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	putReport  : function (req,res){
	var id = req.body.id;
	var status = req.body.status.toString();
	var data = {
		"error":1,
		"data":""
	};
	if(id && status){
		connection.query("UPDATE tbl_report SET status=? WHERE id=?",[status,id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["error"] = 0;
				data["data"] = "data berhasil diubah";
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	deleteReport :function (req, res){
		var id = req.body.id;
		var data = {
			"error":1,
		};
		if(!!id){
			connection.query("DELETE FROM tbl_report WHERE id=?",[id], function (err, rows, fields){
				if(!!err){
					data["tbl_report"] = "error delete data";
				}else{
					data["error"] = 0;
					data["tbl_report"] = " Delete report sukses";

				}
				res.json(data);
				
			});

			
		}else{
			data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
			res.json(data);
			}
	}
}
