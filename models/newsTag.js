var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getNewsTag : function (req, callback){

	var id = req.query.id;
	var kon = req.query.konten;
	if(id && !kon){
		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id', 'tbl_konten_tag.id_konten', 'tbl_konten.judul as konten', 'tbl_konten_tag.tag')
		.whereRaw('tbl_konten_tag.id = ?',[id])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else if(!id && kon){

		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id', 'tbl_konten_tag.id_konten', 'tbl_konten.judul as konten', 'tbl_konten_tag.tag')
		.whereRaw('tbl_konten.id = ?',[kon])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else{

		knex('tbl_konten_tag')
		.join('tbl_konten','tbl_konten.id','tbl_konten_tag.id_konten')
		.select('tbl_konten_tag.id', 'tbl_konten_tag.id_konten', 'tbl_konten.judul as konten', 'tbl_konten_tag.tag')
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}


},

	postNewsTag : function(req, callback) {
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;

	if(Id && Id_Konten && Tag){
			knex('tbl_konten_pivot')
			.insert(knex.raw('VALUES(?,?,?)',[Id,Id_Konten,Tag]))
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

	putNewsTag  : function(req, callback){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Tag = req.body.id_kat_respon;

	if(Id && Id_Konten && Tag){
			knex.raw("UPDATE tbl_konten_pivot SET id_konten=?, id_kat_respon=?, id_user=?, tgl_respon=?,isi=? WHERE id=?",[Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi,Id])
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

	deleteNewsTag : function(req, callback){
	var Id = req.body.id;

	if(!!Id){
			knex('tbl_konten_pivot')
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
