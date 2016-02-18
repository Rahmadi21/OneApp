var uuID  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
module.exports = {

	getResponse : function (req, callback){
	
	var id = req.query.id;
	var cat = req.query.kategori;
	var id_konten = req.query.konten;
	if(id && !cat && !id_konten){
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_konten_respon.id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && cat && !id_konten){
		connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_kat_respon.tipe_respon=?",[cat], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}
	else if(!id && cat && id_konten){
		connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_kat_respon.tipe_respon=? AND tbl_konten.id=?",[cat,id_konten], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}
	else if(!id && !cat && id_konten){
		connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id where tbl_konten.id=?",[id_konten], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}
	else{
	connection.query("SELECT tbl_konten_respon.id,tbl_konten_respon.id_konten,tbl_konten.judul as konten, tbl_kat_respon.tipe_respon , tbl_user.username, tbl_konten_respon.tgl_respon,tbl_konten_respon.isi from tbl_konten_respon INNER JOIN tbl_konten on tbl_konten_respon.id_konten = tbl_konten.id INNER join tbl_user on tbl_konten_respon.id_user = tbl_user.id INNER JOIN tbl_kat_respon on tbl_konten_respon.id_kat_respon = tbl_kat_respon.id", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});
	}

},

	postResponse : function(req, callback){
	var Id = uuID.v4();
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;

	if(Id && Id_Konten && Id_Kat_Respon && Id_User && Tgl_Respon && Isi){
			knex('tbl_konten_pivot')
			.insert(knex.raw('VALUES(?,?,?,?,?,?)',[Id,Id_Konten,Id_Kat_Respon,Id_User,Tgl_Respon,Isi]))
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}

		});
	}else{
		console.log("Error");
	}}

	,

	putResponse  : function(req, callback){
	var Id = req.body.id;
	var Id_Konten = req.body.id_konten;
	var Id_Kat_Respon = req.body.id_kat_respon;
	var Id_User = req.body.id_user;
	var Tgl_Respon = req.body.tgl_respon;
	var Isi = req.body.isi;

	if(Id && Id_Konten && Id_Kat_Respon && Id_User && Tgl_Respon && Isi){
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

	deleteResponse : function(req, callback){
	var Id = req.body.id;
	
	if(!!Id){
			knex('tbl_konten_respon')
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
