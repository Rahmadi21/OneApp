var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getReport :function (req, callback){
	
	var id = req.query.id;
	var pelapor = req.query.pelapor;
	var terlapor = req.query.terlapor;
	var status = req.query.status;
	
	if(id && !pelapor && !terlapor && !status){
	knex('tbl_report')
	.join('tbl_user','tbl_user.id','tbl_report.id_user_terlapor')
	.join('tbl_konten_respon','tbl_konten_respon.id','tbl_report.id_respon')
	.select('tbl_report.id','tbl_report.id_user_terlapor','tbl_report.id_user_pelapor','tbl_report.id_respon','tbl_report.status','tbl_report.tgl_report', 'tbl_user.username as user_terlapor','tbl_konten_respon.isi as isi_komentar')
	.whereRaw('tbl_report.id = ?',[id])
	.orderBy('tbl_report.tgl_report', 'desc')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}		
	else if(!id && pelapor && !terlapor && !status){
	knex('tbl_report')
	.join('tbl_user','tbl_user.id','tbl_report.id_user_terlapor')
	.join('tbl_konten_respon','tbl_konten_respon.id','tbl_report.id_respon')
	.select('tbl_report.id','tbl_report.id_user_terlapor','tbl_report.id_user_pelapor','tbl_report.id_respon','tbl_report.status','tbl_report.tgl_report', 'tbl_user.username as user_terlapor','tbl_konten_respon.isi as isi_komentar')
	.whereRaw('tbl_report.id_user_pelapor = ?',[pelapor])
	.orderBy('tbl_report.tgl_report', 'desc')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !pelapor && terlapor && !status){
	knex('tbl_report')
	.join('tbl_user','tbl_user.id','tbl_report.id_user_terlapor')
	.join('tbl_konten_respon','tbl_konten_respon.id','tbl_report.id_respon')
	.select('tbl_report.id','tbl_report.id_user_terlapor','tbl_report.id_user_pelapor','tbl_report.id_respon','tbl_report.status','tbl_report.tgl_report', 'tbl_user.username as user_terlapor','tbl_konten_respon.isi as isi_komentar')
	.whereRaw('tbl_report.id_user_terlapor = ?', [terlapor])
	.orderBy('tbl_report.tgl_report', 'desc')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !pelapor && !terlapor && status){
	knex('tbl_report')
	.join('tbl_user','tbl_user.id','tbl_report.id_user_terlapor')
	.join('tbl_konten_respon','tbl_konten_respon.id','tbl_report.id_respon')
	.select('tbl_report.id','tbl_report.id_user_terlapor','tbl_report.id_user_pelapor','tbl_report.id_respon','tbl_report.status','tbl_report.tgl_report', 'tbl_user.username as user_terlapor','tbl_konten_respon.isi as isi_komentar')
	.whereRaw('tbl_report.status = ?', [status])
	.orderBy('tbl_report.tgl_report', 'desc')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{
	knex('tbl_report')
	.join('tbl_user','tbl_user.id','tbl_report.id_user_terlapor')
	.join('tbl_konten_respon','tbl_konten_respon.id','tbl_report.id_respon')
	.select('tbl_report.id','tbl_report.id_user_terlapor','tbl_report.id_user_pelapor','tbl_report.id_respon','tbl_report.status','tbl_report.tgl_report', 'tbl_user.username as user_terlapor','tbl_konten_respon.isi as isi_komentar')
	.orderBy('tbl_report.tgl_report', 'desc')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});

}
},

	postReport :function(res,callback){
	var id = uuid.v4();
	var id_user_pelapor = req.body.id_user_pelapor;
	var id_user_terlapor = req.body.id_user_terlapor;
	var id_respon = req.body.id_respon;
	var status = req.body.status;
	var tgl_report = req.body.tgl_report;

			knex('tbl_report')
			.insert({
				'id':id,
				'id_user_pelapor':id_user_pelapor,
				'id_user_terlapor':id_user_terlapor,
				'id_respon':id_respon,
				'status':status,
				'tgl_report':tgl_report
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

	,

	putReport  : function(res,callback){
	var id = req.body.id;
	var status = req.body.status.toString();

			knex('tbl_report')
			.where('id',id)
			.update({
				'status':status
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

	,

	deleteReport :function (req, callback){
		var id = req.params.id;

			knex('tbl_report')
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
