var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getCatUniform : function (req, callback){

	var id = req.query.kategori;

	knex.select().from('tbl_kat_seragam').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	

},

	postCatUniform : function(req,callback){
	var Id = uuID.v4();
	var Kategori = req.body.kategori;

	if(Id && Kategori){
	
			knex('tbl_kat_seragam')
			.insert({
				'id':Id,
				'kategori':Kategori
			})
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		console.log("error");
	}}

	,

	putCatUniform  : function(req,callback){
	var Id = req.body.id;
	var Kategori = req.body.kategori;

	if(Id && Kategori){
		
			knex('tbl_kat_seragam')
			.where('id',Id)
			.update({
				'kategori':Kategori
			})
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		console.log("error");
	}}

	,

	deleteCatUniform : function(req,callback){
	var Id = req.body.id;

	if(!!Id){
		knex('tbl_kat_seragam')
			.whereRaw("id = ?",[id])
			.del()
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		console.log("error");
	}}
	
}
