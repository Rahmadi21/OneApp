var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getReport :function (req, callback){
	
	var id = req.query.id;
	var pelapor = req.query.pelapor;
	var terlapor = req.query.terlapor;
	if(id && !pelapor && !terlapor){
	connection.query("SELECT * from tbl_report where id=?",[id], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && pelapor && !terlapor){
	connection.query("SELECT * from tbl_report where id_user_pelapor=?",[pelapor], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else if(!id && !pelapor && terlapor){
	connection.query("SELECT * from tbl_report where id_user_terlapor=?",[terlapor], function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
		});	
	}
	else{
	connection.query("SELECT * from tbl_report", function (err, rows, fields){
			if(err){
				callback(err);
			}else{
				callback(null,rows);
			}
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

	if(id && id_user_pelapor && id_user_terlapor && id_respon && status && tgl_report){
			knex('tbl_report')
			.insert(knex.raw('VALUES(?,?,?,?,?,?)',[id,id_user_pelapor,id_user_terlapor,id_respon,status,tgl_report]))
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

	putReport  : function(res,callback){
	var id = req.body.id;
	var status = req.body.status.toString();

	if(id && status){
			knex.raw("UPDATE tbl_report SET status=? WHERE id=?",[status,id])
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

	deleteReport :function (req, res){
		var id = req.body.id;

		if(!!id){
			knex('tbl_report')
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
			console.log("error")
			}
	}
}
