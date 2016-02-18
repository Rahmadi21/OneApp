var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getNewsPivot : function (req, callback){

	var id = req.query.id;
	var kon = req.query.konten;
	var tag = req.query.tag;
	if(id && !kon && !tag){
	knex.select().from('tbl_konten_pivot').whereRaw('id = ?',[id]).then(function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && kon && !tag){
	knex.select().from('tbl_konten_pivot').whereRaw('id_konten = ?',[kon]).then(function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !kon && tag){

			knex.select().from('tbl_konten_pivot').whereRaw('id_tag = ?',[tag]).then(function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	
	else{
	knex.select().from('tbl_konten_pivot').then(function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

}
}
