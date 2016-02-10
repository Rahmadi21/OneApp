var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);


module.exports = {

	getCatUniform : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_kat_seragam",function (err, rows, fields){
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

	postCatUniform : function (req,res){
	var Id = uuID.v4();
	var Kategori = req.body.kategori;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Kategori){
		connection.query("INSERT INTO tbl_kat_seragam VALUES(?,?)",[Id,Kategori],function (err, rows, fields){
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

	putCatUniform  : function (req,res){
	var Id = req.body.id;
	var Kategori = req.body.kategori;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Kategori){
		connection.query("UPDATE tbl_kat_seragam SET kategori=? WHERE id=?",[Kategori,Id],function (err, rows, fields){
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

	deleteCatUniform : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_kat_seragam WHERE id=?",[Id],function (err, rows, fields){
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
