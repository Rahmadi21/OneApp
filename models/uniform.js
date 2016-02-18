var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {

	getUniform : function (req, callback){
	var id = req.query.id;
	var cat = req.query.jurusan;
	var cat2= req.query.kategori;
	if(id && !cat && !cat2){
	
		knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.whereRaw('tbl_seragam.id=?',[id])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else if(!id && cat && !cat2){

		knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.whereRaw('tbl_konten.judul=?',[cat])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	else if(!id && !cat && cat2){

		knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.whereRaw('tbl_kat_seragam.kategori=?',[cat2])
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});	
	}
	
	else{
	knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows);
		}
		});
	}

},

	postUniform : function (req,callback){
	var Id = uuID.v4();
	var Id_Kat_Seragam = req.body.id_kat_seragam;
	var Id_Konten = req.body.id_konten;
	var Nama = req.body.nama;
	var Waktu_Pakai = req.body.waktu_pakai;
	var Foto = req.body.foto;

	if(Id && Id_Kat_Seragam && Id_Konten && Nama && Waktu_Pakai && Foto){

			knex('tbl_kat_konten')
			.insert(knex.raw("VALUES(?,?,?,?,?,?)",[Id,Id_Kat_Seragam,Id_Konten,Nama,Waktu_Pakai,Foto]))
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

	putUniform  : function (req,callback){
	var Id = req.body.id;
	var Id_Kat_Seragam = req.body.id_kat_seragam;
	var Id_Konten = req.body.id_konten;
	var Nama = req.body.nama;
	var Waktu_Pakai = req.body.waktu_pakai;
	var Foto = req.body.foto;

	if(Id && Id_Kat_Seragam && Id_Konten && Nama && Waktu_Pakai && Foto){

			knex.raw("UPDATE tbl_seragam SET id_kat_seragam=?, id_konten=?, nama=?, waktu_pakai=?, foto=? WHERE id=?",[Id_Kat_Seragam,Id_Konten,Nama,Waktu_Pakai,Foto,Id])
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
			
		});
	}else{
		console.log("error");	
	}
}
	,

	deleteUniform : function (req,callback){
	var Id = req.body.id;
	if(Id){
		knex('tbl_seragam')
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
