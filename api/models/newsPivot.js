var mysql 		= require('mysql');
var uuID 		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getNewsPivot : function (req,res){
	var data = {
		"error":1,
		"data":""
	};
	
	connection.query("SELECT * from tbl_konten_pivot",function (err, rows, fields){
		if(rows.length != 0){
			data["data"] = rows;
			res.json(data);
		}else{
			data["data"] = 'Not Found..';
			res.json(data);
		}
	});
}
}
