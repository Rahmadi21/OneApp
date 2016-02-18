var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);

module.exports = {
	getContentPhoto : function(req, callback){

	var kon = req.query.konten;
	var id  = req.query.id;
	if(kon && !id){
	knex.select().from('tbl_foto').whereRaw('id_konten = ?',[kon]).then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});	
	}
	else if(!kon && id){
	knex.select().from('tbl_foto').whereRaw('id = ?',[id]).then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});	
	}
	else{
	knex.select().from('tbl_foto').then(function (err, rows, fields){
		if(err){
			callback(err);
		}else{
			callback(null, rows)
		}
		});
	}

},

	postContentPhoto : function(req, callback){
	
		var id = req.body.id || uuid.v4();
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;

		if(id && id_konten && foto){
			
			knex('tbl_foto')
			.insert(knex.raw('VALUES(?,?,?)',[id, id_konten, foto]))
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

	},

	putContentPhoto  : function(req, callback){
	
		var id = req.body.id;
		var id_konten = req.body.id_konten;
		var foto = req.body.foto;


			if(id && id_konten && foto){
	
			knex.raw("UPDATE tbl_foto SET id_konten=?, foto=? WHERE id=?",[id_konten, foto, id])
			.then(function (err, rows, fields){
				if(err){
					callback(err);
				}else{
					callback(null, rows);
				}
		});
		
		}
		else{
			console.log("error");
		}

	},

	deleteContentPhoto :  function(req, callback){
		var id = req.body.id;

		if(!!id){
			knex('tbl_foto')
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
