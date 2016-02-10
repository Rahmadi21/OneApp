var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getResponseAttend : function (req,res){
		var data = {
			"error":1,
			"one_app":""
		}
		connection.query("SELECT * FROM tbl_konten_respon WHERE id_kat_respon='c38362fe-cf1d-11e5-8978-b888e391'",function (err,rows,fields){
			if(rows.length != 0){
				data["error"] = 0;
				data["one_app"] = rows;
			res.json(data);
		}else{
			data["one_app"] = 'tidak ditemukan';
			res.json(data);
		}	
		});
	}
	
}
