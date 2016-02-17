var mysql 		= require('mysql');
var uuid  		= require('node-uuid');
var conn 		= require('../config/conn.js')
var connection  = mysql.createConnection(conn);
var _			= require('lodash');

module.exports = {
	getFavorite : function (callback) {
		var data = {};
		connection.query("SELECT tbl_konten.judul as judul, tbl_user.id as user_id from tbl_konten LEFT JOIN tbl_user ON tbl_user.jurusan_favorite = tbl_konten.id WHERE tbl_konten.id_kat_konten = '6a1ec81d-cbbd-11e5-86b1-00269e3e' ", function (err, rows, fields){
		if(err){
			callback(err);
		}
		else{
			data["error"] = 0;
			
			rows = _.groupBy(rows, 'judul');
			rows = _.reduce(rows, function(total, jurusans, namaJurusan) {
				var jurusan={}
				jurusan.nama = namaJurusan;

				jurusan.total = _.reduce(jurusans, function(total,jurusans){
					if(jurusans.user_id){
						total = total+1;
					}
					return total

				},0);
				total.push(jurusan);
				return total;
			}, []);
			callback(null, rows);
	
		}
		});
	}

}
