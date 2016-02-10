var mysql 		= require('mysql');
var uuID 		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);

module.exports = {

	getUniform : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_seragam",function (err, rows, fields){
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

	postUniform : function (req,res){
	var Id = uuID.v4();
	var Id_Kat_Seragam = req.body.id_kat_seragam;
	var Id_Konten = req.body.id_konten;
	var Nama = req.body.nama;
	var Waktu_Pakai = req.body.waktu_pakai;
	var Foto = req.body.foto;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Kat_Seragam && Id_Konten && Nama && Waktu_Pakai && Foto){
		connection.query("INSERT INTO tbl_seragam VALUES(?,?,?,?,?,?)",[Id,Id_Kat_Seragam,Id_Konten,Nama,Waktu_Pakai,Foto],function (err, rows, fields){
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

	putUniform  : function (req,res){
	var Id = req.body.id;
	var Id_Kat_Seragam = req.body.id_kat_seragam;
	var Id_Konten = req.body.id_konten;
	var Nama = req.body.nama;
	var Waktu_Pakai = req.body.waktu_pakai;
	var Foto = req.body.foto;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Kat_Seragam && Id_Konten && Nama && Waktu_Pakai && Foto){
		connection.query("UPDATE tbl_seragam SET id_kat_seragam=?, id_konten=?, nama=?, waktu_pakai=?, foto=? WHERE id=?",[Id_Kat_Seragam,Id_Konten,Nama,Waktu_Pakai,Foto,Id],function (err, rows, fields){
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

	deleteUniform : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_seragam WHERE id=?",[Id],function (err, rows, fields){
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
