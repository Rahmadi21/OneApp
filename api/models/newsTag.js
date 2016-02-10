var mysql = require('mysql');
var uuID  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {

	getNewsTag : function (req,res) {
		var data = {
		"data":""
	};
	
	connection.query("SELECT * from tbl_konten_tag",function (err, rows, fields){
		if(rows.length != 0){
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});}

	,

	postNewsTag : function (req,res) {
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tag){
		connection.query("INSERT INTO tbl_konten_pivot VALUES(?,?,?)",[Id,Id_Konten,Tag],function (err, rows, fields){
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

	putNewsTag  : function (req,res){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;
	var data = {
		"error":1,
		"data":""
	};
	if(Id && Id_Konten && Tag){
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

	deleteNewsTag : function (req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Users":""
	};
	if(!!Id){
		connection.query("DELETE FROM tbl_konten_tag WHERE id=?",[Id],function (err, rows, fields){
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
