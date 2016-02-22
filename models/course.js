var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {
	getCourse : function(req, callback){

	var id = req.query.id;
	var cat = req.query.kategori;
	var jur = req.query.jurusan;
	if(id && !cat && !jur){
	
		knex('tbl_nama_pelajaran')
		.join('tbl_kat_pelajaran','tbl_kat_pelajaran.id','tbl_nama_pelajaran.id_kategori')
		.join('tbl_konten','tbl_konten.id','tbl_nama_pelajaran.id_konten')
		.select('tbl_nama_pelajaran.*' ,'tbl_kat_pelajaran.nama_kat as kategori', 'tbl_konten.judul as jurusan')
		.whereRaw('tbl_nama_pelajaran.id = ?',[id])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && cat && !jur){

		knex('tbl_nama_pelajaran')
		.join('tbl_kat_pelajaran','tbl_kat_pelajaran.id','tbl_nama_pelajaran.id_kategori')
		.join('tbl_konten','tbl_konten.id','tbl_nama_pelajaran.id_konten')
		.select('tbl_nama_pelajaran.*' ,'tbl_kat_pelajaran.nama_kat as kategori', 'tbl_konten.judul as jurusan')
		.whereRaw('tbl_kat_pelajaran.nama_kat = ?',[cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && !cat && jur){
		knex('tbl_nama_pelajaran')
		.join('tbl_kat_pelajaran','tbl_kat_pelajaran.id','tbl_nama_pelajaran.id_kategori')
		.join('tbl_konten','tbl_konten.id','tbl_nama_pelajaran.id_konten')
		.select('tbl_nama_pelajaran.*' ,'tbl_kat_pelajaran.nama_kat as kategori', 'tbl_konten.judul as jurusan')
		.whereRaw('tbl_konten.judul = ?',[jur])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && cat && jur){
		knex('tbl_nama_pelajaran')
		.join('tbl_kat_pelajaran','tbl_kat_pelajaran.id','tbl_nama_pelajaran.id_kategori')
		.join('tbl_konten','tbl_konten.id','tbl_nama_pelajaran.id_konten')
		.select('tbl_nama_pelajaran.*' ,'tbl_kat_pelajaran.nama_kat as kategori', 'tbl_konten.judul as jurusan')
		.whereRaw('tbl_konten.judul = ? AND tbl_kat_pelajaran.nama_kat = ?',[jur,cat])
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else{
	knex('tbl_nama_pelajaran')
		.join('tbl_kat_pelajaran','tbl_kat_pelajaran.id','tbl_nama_pelajaran.id_kategori')
		.join('tbl_konten','tbl_konten.id','tbl_nama_pelajaran.id_konten')
		.select('tbl_nama_pelajaran.*' ,'tbl_kat_pelajaran.nama_kat as kategori', 'tbl_konten.judul as jurusan')
		.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},

postCourse : function(req, callback){
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var id_kategori = req.body.id_kategori;
		var nama_pelajaran = req.body.nama_pelajaran;

	
			knex('tbl_nama_pelajaran')
			.insert({
				'id':id,
				'id_konten':id_konten,
				'id_kategori':id_kategori,
				'nama_pelajaran':nama_pelajaran
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});		
	
	},	
putCourse  : function(req, callback){

	var id = uuid.v4();
	var id_konten = req.body.id_konten;
	var id_kategori = req.body.id_kategori;
	var nama_pelajaran = req.body.nama_pelajaran;

			knex('tbl_nama_pelajaran')
			.where('id',id)
			.update({
				'id_konten':id_konten,
				'id_kategori':id_kategori,
				'nama_pelajaran':nama_pelajaran
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	

},

	deleteCourse : function (req,call){
	var Id = req.body.id || uuid.v4();

			knex('tbl_nama_pelajaran')
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
