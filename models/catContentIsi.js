var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getCat : function (req, callback){

	var id = req.query.id;
	var cat = req.params.cat;
	if(id){

		knex('tbl_konten')
		.join('tbl_kat_konten','tbl_konten.id_kat_konten','tbl_kat_konten.id')
		.join('tbl_user','tbl_konten.id_user','tbl_user.id')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.whereRaw('tbl_kat_konten.konten=? AND tbl_konten.id=?',[cat,id])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else{
		knex('tbl_konten')
		.join('tbl_kat_konten','tbl_konten.id_kat_konten','tbl_kat_konten.id')
		.join('tbl_user','tbl_konten.id_user','tbl_user.id')
		.select('tbl_konten.*','tbl_kat_konten.konten','tbl_user.username as penulis')
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

},
	
	postCat : function (req, callback){
	var Id = uuID.v4();
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status.toString();

	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){

			knex('tbl_konten')
			.insert(knex.raw('VALUES(?,?,?,?,?,?,?)',[Id,Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status]))
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		console.log("error");
	}},

	putCat : function (req, callback){
	var Id = req.body.id;
	var Id_Kat_Konten = req.body.id_kat_konten;
	var Id_User = req.body.id_user;
	var Tgl_Posting = req.body.tgl_posting;
	var Judul = req.body.judul;
	var Isi = req.body.isi;
	var Status = req.body.status;

	if(Id && Id_Kat_Konten && Id_User && Tgl_Posting && Judul && Isi && Status){

			knex.raw("UPDATE tbl_konten SET id_kat_konten=?, id_user=?, tgl_posting=?, judul=?, isi=?, status=? WHERE id=?",[Id_Kat_Konten,Id_User,Tgl_Posting,Judul,Isi,Status,Id])
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		console.log("error");
	}},

	deleteCat : function (req, callback){
	var Id = req.body.id;

	if(!!Id){
		knex('tbl_konten')
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