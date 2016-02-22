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
	}
}