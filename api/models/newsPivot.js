var mysql = require('mysql');
var uuID  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
<<<<<<< HEAD
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
	});}
=======
	getNewsPivot :{}
>>>>>>> 212251080acff3c3cf59a66e8549d6fa9b09ba43
}
