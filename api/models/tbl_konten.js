var mysql = require('mysql');
var con = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'one_app',
	});

module.exports = {
	getKonten : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	con.query("SELECT * from tbl_konten",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});},
	
	postKonten : function (req,res){
	var Id = uuID.v4();
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){
		con.query("INSERT INTO tbl_konten VALUES(?,?,?,?,?,?,?)",[Id,Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status],function (err, rows, fields){
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
	}},

	putKonten : function (req,res){
	var Id = req.body.id;
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){
		con.query("UPDATE tbl_konten SET id_kat_konten=?, id_user=?, tgl_posting=?, judul=?, isi=?, status=? WHERE id=?",[Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status,Id],function (err, rows, fields){
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
	}},

	deleteKonten : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		con.query("DELETE FROM tbl_konten WHERE id=?",[Id],function (err, rows, fields){
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