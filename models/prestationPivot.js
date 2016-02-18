var mysql 		= require('mysql');
var uuID 		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
module.exports = {
	getPrestationPivot : function (req, callback){

var id = req.query.id;
	var kon = req.query.konten;
	var peserta = req.query.peserta;
	if(id && !kon && !peserta){
	
	knex.select().from('tbl_prestasi_pivot').whereRaw('id = ?',[id]).then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		
	
		});	
	}
	else if(!id && kon && !peserta){
	knex.select().from('tbl_prestasi_pivot').whereRaw('id_konten = ?',[kon]).then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else if(!id && !kon && peserta){
	knex.select().from('tbl_prestasi_pivot').whereRaw('id_prestasi = ?',[peserta]).then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	
	else{
	knex.select().from('tbl_prestasi_pivot').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

}
}
