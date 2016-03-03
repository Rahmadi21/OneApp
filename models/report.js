var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getReport :function (req, callback){
	
	var id = req.query.id;
	var pelapor = req.query.pelapor;
	var terlapor = req.query.terlapor;
	if(id && !pelapor && !terlapor){
	knex.select().from('tbl_report')
	.whereRaw('id = ?',[id])
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}		
	else if(!id && pelapor && !terlapor){
	knex.select().from('tbl_report')
	.whereRaw('id_user_pelapor = ?',[pelapor])
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else if(!id && !pelapor && terlapor){
	knex.select().from('tbl_report')
	.whereRaw('id_user_terlapor = ?', [terlapor])
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}
	else{
	knex.select().from('tbl_report')
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
