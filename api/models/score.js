var mysql 		= require('mysql');
var uuID  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {
	getScore : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_nem",function (err, rows, fields){
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

	postScore : function (req,res){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tahun = req.body.tahun;
	var Nem_Tinggi = req.body.nem_tinggi;
	var Nem_Rendah = req.body.nem_rendah;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tahun && Nem_Tinggi && Nem_Rendah){
		connection.query("INSERT INTO tbl_nem VALUES(?,?,?,?,?)",[Id,Id_Konten,Tahun,Nem_Tinggi,Nem_Rendah],function (err, rows, fields){
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

	putScore  : function (req,res){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tahun = req.body.tahun;
	var Nem_Tinggi = req.body.nem_tinggi;
	var Nem_Rendah = req.body.nem_rendah;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tahun && Nem_Tinggi && Nem_Rendah){
		connection.query("UPDATE tbl_nem SET id_konten=?, tahun=?, nem_tinggi=?, nem_rendah=? WHERE id=?",[Id_Konten,Tahun,Nem_Tinggi,Nem_Rendah,Id],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Edit Success";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	deleteScore : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_nem WHERE id=?",[Id],function (err, rows, fields){
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
