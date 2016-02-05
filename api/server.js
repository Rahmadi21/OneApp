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

/*========================tbl_user=======================*/
app.get('/', function (req, res){
	var data = {
		"Data":""
	};
	data["Data"] = "Selamat datang di OneApp";
	res.json(data);
});

app.get('/tbl_user', userModel.getuser);

app.post('/tbl_user', userModel.postUser);

app.put('/tbl_user', userModel.putUser); 

app.delete('/tbl_user', userModel.deleteUser);


/*========================tbl_kat_user=======================*/
app.get('/', function (req, res){
	var data = {
		"Data":""
	};
	data["Data"] = "Selamat datang di OneApp";
	res.json(data);
});

app.get('/tbl_kat_user', katUserModel.getKatUser)

app.post('/tbl_kat_user', function (req, res){
	

	var id = req.body.id;
	var kategori = req.body.kategori;
	var data = {
		"error":1,
		"one_app":""
	};
	if(id && kategori){
		connection.query("INSERT INTO tbl_kat_user VALUES(?,?)",[id, kategori], function (err, rows, fields){
			if(!!err){
				data["one_app"] = "error dalam menambahkan data";
			}else{
				data["error"] = 0;
				data["one_app"] = "data berhasil ditambahkan";
			}
		
		res.json(data);
});
	
		}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e : id, kategori)";
	res.json(data);


	}
});
app.put('/tbl_kat_user', function (req, res){
	var id = req.body.id;
	var kategori = req.body.kategori;
	var data = {
		"error":1,
		"one_app":""
	};
	if(id && kategori){
		connection.query("UPDATE tbl_kat_user SET kategori=? WHERE id=?",[kategori, id], function (err, rows, fields){
			if(!!err){
				data["one_app"] = "error mengupdate data";
			}else{
				data["error"] = 0;
				data["one_app"] = "data berhasil di update";
			}
		
		res.json(data);
});
	
	}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e : id, kategori)";
	res.json(data);


	}
}); 

app.delete('/tbl_kat_user', function (req, res){
	var id = req.body.id;
	var data = {
		"error":1,
		"one_app":""
	};
	if(!!id){
		connection.query("DELETE FROM tbl_kat_user WHERE id=?",[id], function (err, rows, fields){
			if(!!err){
				data["tbl_kat_user"] = "error delete data";
			}else{
				data["error"] = 0;
				data["tbl_kat_user"] = " Delete user sukses";

			}
			res.json(data);
			
		});

	
}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
	res.json(data);
	}
});


http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});