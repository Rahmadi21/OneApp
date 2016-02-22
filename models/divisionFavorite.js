var uuid  		= require('node-uuid');
var conn 		= require('../config/connection.js');
var knex		= require('knex')(conn);
var _			= require('lodash');

module.exports = {
	getFavorite : function (callback) {
		
		knex('tbl_konten')
		.join('tbl_kat_konten','tbl_kat_konten.id','tbl_konten.id_kat_konten')
		.leftJoin('tbl_user','tbl_user.jurusan_favorite','tbl_konten.id')
		.select('tbl_konten.judul as judul', 'tbl_user.id as user_id')
		.where('tbl_kat_konten.konten','jurusan')
		.then(function ( rows){	
			
			rows = _.groupBy(rows, 'judul');
			rows = _.reduce(rows, function(total, jurusans, namaJurusan) {
				var jurusan={}
				jurusan.jurusan = namaJurusan;

				jurusan.total = _.reduce(jurusans, function(total,jurusans){
					if(jurusans.user_id){
						total = total+1;
					}
					return total

				},0);
				total.push(jurusan);
				return total;
			}, []);
			rows = _.orderBy(rows, ['total'],['desc']);
			rows = rows.map(function(detail,key){
				detail.rank = key+1;
				return detail;
			})
			callback(null, rows);
	
		
		})
		.catch(function (err){
			callback(err)
		})
	}

}
