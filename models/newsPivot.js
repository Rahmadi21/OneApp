var mysql 		= require('mysql');
var uuID 		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getNewsPivot : function (req, callback){

	var id = req.query.id;
	var kon = req.query.konten;
	var tag = req.query.tag;
	if(id && !kon && !tag){
	connection.query("select * from tbl_konten_pivot where id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && kon && !tag){
	connection.query("SELECT * from tbl_konten_pivot where id_konten=?",[kon], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !kon && tag){
	connection.query("SELECT * from tbl_konten_pivot where id_tag=?",[tag], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	
	else{
	connection.query("SELECT * from tbl_konten_pivot", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

}
}
