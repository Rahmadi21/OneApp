var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
<<<<<<< HEAD
	getResponse : function () {}
=======
<<<<<<< HEAD
	getResponse : function (req,res){
	var data = {
		"data":""
	};
	
	connection.query("SELECT * from tbl_konten_respon",function (err, rows, fields){
		if(rows.length != 0){
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});}

	,

	postResponse : function (req,res){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Id_Kat_Respon && Id_User && Tgl_Respon && Isi){
		connection.query("INSERT INTO tbl_konten_pivot VALUES(?,?,?,?,?,?)",[Id,Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi],function (err, rows, fields){
			if(!!err){
				data["data"] = err;
			}else{
				data["data"] = "Succesfull";
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data["data"] = "Please provide all required data";
		res.json(data);
	}}

	,

	putResponse  : function (req,res){
	var Id = req.body.id;
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Id_Kat_Respon && Id_User && Tgl_Respon && Isi){
		connection.query("UPDATE tbl_konten_pivot SET id_konten=?, id_kat_respon=?, id_user=?, tgl_respon=?,isi=? WHERE id=?",[Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi,Id],function (err, rows, fields){
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

	deleteResponse : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_konten_respon WHERE id=?",[Id],function (err, rows, fields){
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
=======
	getResponse : {}
>>>>>>> 6882b2bebf711a4c8712c1875689741559cb0539

	,

	postResponse :function () {}

	,

	putResponse  :function () {}

	,

<<<<<<< HEAD
	deleteResponse :function () {}
=======
	deleteResponse :{}
>>>>>>> 212251080acff3c3cf59a66e8549d6fa9b09ba43
>>>>>>> 6882b2bebf711a4c8712c1875689741559cb0539
}
