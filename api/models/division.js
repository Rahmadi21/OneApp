var mysql = require('mysql');
var uuID  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getDivision : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_konten WHERE id_kat_konten='6a1ec81d-cbbd-11e5-86b1-00269e3e'",function (err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});}

	,

	postDivision : function (req,res){
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
		connection.query("INSERT INTO tbl_konten VALUES(?,?,?,?,?,?,?)",[Id,Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status],function (err, rows, fields){
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

	,

	putDivision  : function (req,res){
	var Id = req.body.id;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_User && Tgl_Posting && Judul && Isi && Status){
		connection.query("UPDATE tbl_konten SET id_user=?, tgl_posting=?, judul=?, isi=?, status=? WHERE id=?",[Id_User,Tgl_Posting,Judul,Isi,Status,Id],function (err, rows, fields){
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

	,

	deleteDivision : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_konten WHERE id=?",[Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Delete Success";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}
}
