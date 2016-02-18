var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getScore : function (req, callback){

	var id = req.query.id;
	var cat = req.query.tahun;
	var jur = req.query.jurusan;
	if(id && !cat && !jur){
	connection.query("select tbl_nem.id, tbl_konten.judul as jurusan, tbl_nem.tahun, tbl_nem.nem_tinggi, tbl_nem.nem_rendah from tbl_nem inner join tbl_konten on tbl_nem.id_konten = tbl_konten.id where tbl_nem.id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && cat && !jur){
		connection.query("select tbl_nem.id, tbl_konten.judul as jurusan, tbl_nem.tahun, tbl_nem.nem_tinggi, tbl_nem.nem_rendah from tbl_nem inner join tbl_konten on tbl_nem.id_konten = tbl_konten.id where tbl_nem.tahun =?",[cat], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !cat && jur){
		connection.query("select tbl_nem.id, tbl_konten.judul as jurusan, tbl_nem.tahun, tbl_nem.nem_tinggi, tbl_nem.nem_rendah from tbl_nem inner join tbl_konten on tbl_nem.id_konten = tbl_konten.id where tbl_konten.judul =?",[jur], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && cat && jur){
		connection.query("select tbl_nem.id, tbl_konten.judul as jurusan, tbl_nem.tahun, tbl_nem.nem_tinggi, tbl_nem.nem_rendah from tbl_nem inner join tbl_konten on tbl_nem.id_konten = tbl_konten.id where tbl_konten.judul =? AND tbl_nem.tahun=?",[jur,cat], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}

	else{
	connection.query("select tbl_nem.id, tbl_konten.judul as jurusan, tbl_nem.tahun, tbl_nem.nem_tinggi, tbl_nem.nem_rendah from tbl_nem inner join tbl_konten on tbl_nem.id_konten = tbl_konten.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postScore : function (req,callback){
	var id = uuid.v4;
	var id_konten = req.body.id_konten;
	var tahun = req.body.tahun;
	var nem_tinggi = req.body.nem_tinggi;
	var nem_rendah = req.body.nem_rendah;

	if(!!id && !!id_konten && !!tahun && !!nem_tinggi){

			knex('tbl_nem')
			.insert(knex.raw('values(?,?,?,?,?)',[id, id_konten,tahun,nem_tinggi, nem_rendah]))
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else{
		data["Data"] = "Please provide all required data (i.e : id, id_konten,tahun, nama_pelajaran)";
		res.json(data);

	}
},
	
	putScore  :function (req, callback){

	var id = uuid.v4;
	var id_konten = req.body.id_konten;
	var tahun = req.body.tahun;
	var nem_tinggi= req.body.nem_tinggi;
	var nem_rendah = req.body.nem_rendah;

	if(!!id && !!id_konten && !!tahun && !!nem_tinggi){
		connection.query("UPDATE tbl_nem SET id_konten=?, tahun=?, nem_tinggi=?, nem_rendah? WHERE id=?",[id, id_konten, tahun, nem_tinggi, nem_rendah], function (err, rows, fileds){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}

			knex.raw("UPDATE tbl_nem SET id_konten=?, tahun=?, nem_tinggi=?, nem_rendah? WHERE id=?",[id, id_konten, tahun, nem_tinggi, nem_rendah])
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
	}else {
		console.log("error");
	}

},

	deleteScore : function (req, callback){
		var id = req.body.id;

		if(!!id){
			knex('tbl_nem')
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
			}
	}

}
