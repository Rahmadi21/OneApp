var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getScore : function () {}

	,

	postScore :function () {}

	,

	putScore  :function () {}

	,

	deleteScore :function () {}
}
