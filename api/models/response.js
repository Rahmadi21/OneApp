var mysql = require('mysql');
var uuid  = require('node-uuid');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

module.exports = {
	getResponse : function () {}

	,

	postResponse :function () {}

	,

	putResponse  :function () {}

	,

	deleteResponse :function () {}
}
