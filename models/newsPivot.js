var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var tags		= require('./content.js');
module.exports = {
	getNewsPivot : function (req, callback){

	var id = req.query.id;
	var kon = req.query.konten;
	var tag = req.query.tag;
	if(id && !kon && !tag){

		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id','tbl_konten_tag.id_konten','tbl_konten.judul as konten','tbl_konten_tag.tag')
		.whereRaw('id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && kon && !tag){

		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id','tbl_konten_tag.id_konten','tbl_konten.judul as konten','tbl_konten_tag.tag')
		.whereRaw('id_konten = ?',[kon])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !kon && tag){

		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id','tbl_konten_tag.id_konten','tbl_konten.judul as konten','tbl_konten_tag.tag')
		.whereRaw('id_tag = ?',[tag])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	
	else{
	knex.select().from('tbl_konten_pivot')
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});


	}

}
,

	postNews : function(req, callback) {
	var Id = uuID.v4();
	var Tag = req.body.id_tag;

			konten.postContent(req, function (err, result){
			knex('tbl_konten_pivot')
			.insert({
				'id':Id,
				'id_konten':result.id,
				'id_tag':Tag
			})
			.then(function (rows){
				callback(null, data);
			})
			.catch(function (err){
				callback(err)
			});
			});
}
}
