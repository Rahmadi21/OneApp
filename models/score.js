var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getScore : function (req, callback){

var id = req.query.id;
	var tahun = req.query.tahun;
	var jur = req.query.jurusan;
	if(id && !tahun && !jur){
	
		knex('tbl_nem')
		.join('tbl_konten','tbl_konten.id','tbl_nem.id_konten')
		.select('tbl_nem.id', 'tbl_konten.judul as jurusan', 'tbl_nem.tahun', 'tbl_nem.nem_tinggi', 'tbl_nem.nem_rendah')
		.whereRaw('tbl_nem.id = ?',[id])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!id && tahun && !jur){
		knex('tbl_nem')
		.join('tbl_konten','tbl_konten.id','tbl_nem.id_konten')
		.select('tbl_nem.id', 'tbl_konten.judul as jurusan', 'tbl_nem.tahun', 'tbl_nem.nem_tinggi', 'tbl_nem.nem_rendah')
		.whereRaw('tbl_nem.tahun = ?',[tahun])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !tahun && jur){
		knex('tbl_nem')
		.join('tbl_konten','tbl_konten.id','tbl_nem.id_konten')
		.select('tbl_nem.id', 'tbl_konten.judul as jurusan', 'tbl_nem.tahun', 'tbl_nem.nem_tinggi', 'tbl_nem.nem_rendah')
		.whereRaw('tbl_konten.judul = ?',[jur])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && tahun && jur){
		knex('tbl_nem')
		.join('tbl_konten','tbl_konten.id','tbl_nem.id_konten')
		.select('tbl_nem.id', 'tbl_konten.judul as jurusan', 'tbl_nem.tahun', 'tbl_nem.nem_tinggi', 'tbl_nem.nem_rendah')
		.whereRaw('tbl_nem.tahun = ? AND tbl_konten.judul = ?',[tahun,jur])
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}

	else{
	knex('tbl_nem')
		.join('tbl_konten','tbl_konten.id','tbl_nem.id_konten')
		.select('tbl_nem.id', 'tbl_konten.judul as jurusan', 'tbl_nem.tahun', 'tbl_nem.nem_tinggi', 'tbl_nem.nem_rendah')
		.then(function (rows){
					callback(null, rows);
				})
			.catch(function (err){
				callback(err)
			});
	}

},

	postScore : function (req,callback){
	var id = uuid.v4;
	var id_konten = req.body.id_konten;
	var tahun = req.body.tahun;
	var nem_tinggi = req.body.nem_tinggi;
	var nem_rendah = req.body.nem_rendah;

			knex('tbl_nem')
			.insert({
				'id':id,
				'id_konten':id_konten,
				'tahun':tahun,
				'nem_tinggi':nem_tinggi,
				'nem_rendah':nem_rendah
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	
},
	
	putScore  :function (req, callback){

	var id = uuid.v4;
	var id_konten = req.body.id_konten;
	var tahun = req.body.tahun;
	var nem_tinggi= req.body.nem_tinggi;
	var nem_rendah = req.body.nem_rendah;

			knex('tbl_nem')
			.where('id',id)
			.update({
				'id_konten':id_konten,
				'tahun':tahun,
				'nem_tinggi':nem_tinggi,
				'nem_rendah':nem_rendah
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	

},

	deleteScore : function (req, callback){
		var id = req.body.id;

			knex('tbl_nem')
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
