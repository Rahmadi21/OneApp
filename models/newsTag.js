var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getNewsTag : function (req, callback){

	var id = req.query.id;
	if(id){
		knex('tbl_konten_tag')
		.select()
		.whereRaw('tbl_konten_tag.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{

		knex('tbl_konten_tag')
		.select()
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}


},

	postNewsTag : function(req, callback) {
	var Id = uuID.v4();
	var Tag = req.body.tag;
	var data = {
		'id':Id,
		'tag':Tag
	}
			knex('tbl_konten_pivot')
			.insert(data)
			.then(function (rows){
				callback(null, data);
			})
			.catch(function (err){
				callback(err)
			});
	
}

	,

	putNewsTag  : function(req, callback){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;

			knex('tbl_konten_tag')
			.where('id',id)
			.update({
				'tag':Tag
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
	}

	,

	deleteNewsTag : function(req, callback){
	var id = req.params.id;

			knex('tbl_konten_pivot')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
}
