var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getNewsTag : function () {}

	,

	postNewsTag :function () {}

	,

	putNewsTag  :function () {}

	,

	deleteNewsTag :function () {}
}
