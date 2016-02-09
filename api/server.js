var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
var userModel = require("./models/tbl_user.js")
var katUserModel = require("./models/tbl_kat_user.js")
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'one_app',
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res){
	var data = {
		"Data":""
	};
	data["Data"] = "Selamat datang di OneApp";
	res.json(data);
});

/*========================tbl_user=======================*/

app.get('/tbl_user', userModel.getuser);

app.post('/tbl_user', userModel.postUser);

app.put('/tbl_user', userModel.putUser); 

app.delete('/tbl_user', userModel.deleteUser);
/*--------------------------------------------------------*/

/*========================tbl_kat_user=======================*/

app.get('/tbl_kat_user', katUserModel.getKatUser);

app.post('/tbl_kat_user', katUserModel.postKatUser);

app.put('/tbl_kat_user', katUserModel.putKatUser);

app.delete('/tbl_kat_user', katUserModel.deleteKatUser);
/*--------------------------------------------------------*/


http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});