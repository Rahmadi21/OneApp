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
		.then(function (rows){
			callback(null, rows);
		})
		.catch(function (err){
			callback(err)
		});	
	}
	else if(!id && cat && !cat2){

		knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.whereRaw('tbl_konten.judul=?',[cat])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && !cat && cat2){

		knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.whereRaw('tbl_kat_seragam.kategori=?',[cat2])
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
		});	
	}
	
	else{
	knex('tbl_seragam')
		.join('tbl_konten','tbl_konten.id','tbl_seragam.id_konten')
		.join('tbl_kat_seragam','tbl_kat_seragam.id','tbl_seragam.id_kat_seragam')
		.select('tbl_seragam.id', 'tbl_kat_seragam.kategori', 'tbl_konten.judul as jurusan', 'tbl_seragam.nama', 'tbl_seragam.waktu_pakai', 'tbl_seragam.foto')
		.then(function (rows){
				callback(null, rows);
			})
		.catch(function (err){
			callback(err)
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

			knex('tbl_kat_konten')
			.insert({
				'id':Id,
				'id_kat_seragam':Id_Kat_Seragam,
				'id_konten':Id_Konten,
				'nama':Nama,
				'waktu_pakai':Waktu_Pakai,
				'foto':Foto
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	
}

	,

	putUniform  : function (req,callback){
	var Id = req.body.id;
	var Id_Kat_Seragam = req.body.id_kat_seragam;
	var Id_Konten = req.body.id_konten;
	var Nama = req.body.nama;
	var Waktu_Pakai = req.body.waktu_pakai;
	var Foto = req.body.foto;

			knex('tbl_seragam')
			.where('id',Id)
			.update({
				'id_kat_seragam' : Id_Kat_Seragam,
				'id_konten':Id_Konten,
				'nama':Nama,
				'waktu_pakai':Waktu_Pakai,
				'foto':Foto
			})
			.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
			

}
	,

	deleteUniform : function (req,callback){
	var Id = req.body.id;
	
		knex('tbl_seragam')
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
