var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var konten		= require('./content.js');
module.exports = {
	getContentPhoto : function(req, callback){

	var kon = req.query.konten;
	var id  = req.query.id;
	if(kon && !id){
	knex.select().from('tbl_foto').whereRaw('id_konten = ?',[kon])
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else if(!kon && id){
	knex.select().from('tbl_foto').whereRaw('id = ?',[id])
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});	
	}
	else{
	knex.select().from('tbl_foto')
	.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
	}

},

	postContentPhoto : function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;
		
			konten.postContent(req, function (err, result){
			knex('tbl_foto')
			.insert({
				'id':id,
				'id_konten':id_konten,
				'foto':foto
			})
			.then(function (rows){
				callback(null, data);
			})
			.catch(function (err){
				callback(err)
			});
			});
		

	},

	putContentPhoto  : function(req, callback){
	
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;

			knex('tbl_foto')
			.where('id',id)
			.update({
				'id_konten':id_konten,
				'foto':foto
			})
			.then(function (rows){
				callback(null, rows);
			})
			.catch(function (err){
				callback(err)
			});
		

	},

	deleteContentPhoto :  function(req, callback){
		var id = req.params.id;

		knex('tbl_foto')
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
