var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getPresPivot : function(callback){
		knex('tbl_prestasi_pivot').select()
		.then(function (rows){
			callback(null, rows);
		})
		.catch(function (err){
			callback(err);
		})
	},

	postPrestasiPivot : function(req, callback) {
	var Id = uuID.v4();
	var peserta = req.body.id_peserta;

			konten.postContent(req, function (err, result){
			knex('tbl_prestasi_pivot')
			.insert({
				'id':Id,
				'id_konten':result.id,
				'id_peserta':peserta
			})
			.then(function (rows){
				callback(null, data);
			})
			.catch(function (err){
				callback(err)
			});
			});
},
deletePrestasiPivot :function (req, res){
		var id = req.params.id;

			knex('tbl_prestasi_pivot')
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