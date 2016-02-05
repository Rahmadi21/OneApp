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

app.get('/tbl_user', userModel.getuser) 

app.post('/tbl_user', function (req, res){
	var id = uuid.	v4();
	var id_kat_user = req.body.id_kat_user;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var nama_asli = req.body.nama_asli;
	var tgl_lahir = req.body.tgl_lahir;
	var pekerjaan = req.body.pekerjaan;
	var foto_profile = req.body.foto_profile;
	var jurusan_favorite = req.body.jurusan_favorite;
	var reputasi = req.body.reputasi;
	var data = {
		"error":1,
		"one_app":""
	};



if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
	connection.query("INSERT INTO tbl_user VALUES(?,?,?,?,?,?,?,?,?,?,?)",[id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi], function(err, rows, fields){
		if(!!err){
			data["one_app"] = "Error dalam menambahkan data";	
		}else{
			data["error"] = 0;
			data["one_app"] = "User berhasil ditambahkan";		
		}
		res.json(data);
	});
}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e : id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi)";
	res.json(data);

}
});

app.put('/tbl_user', function (req, res){
	
	var id = req.body.id;
	var id_kat_user = req.body.id_kat_user;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var nama_asli = req.body.nama_asli;
	var tgl_lahir = req.body.tgl_lahir;
	var pekerjaan = req.body.pekerjaan;
	var foto_profile = req.body.foto_profile;
	var jurusan_favorite = req.body.jurusan_favorite;
	var reputasi = req.body.reputasi;
	var data = {
		"error":1,
		"one_app":""
	};
	if(id && id_kat_user && email && username && password && nama_asli && tgl_lahir && password && foto_profile && jurusan_favorite && reputasi){
	connection.query("UPDATE tbl_user SET id_kat_user=?, email=?, username=?, password=?, nama_asli=?, tgl_lahir=?, pekerjaan=?, foto_profile=?, jurusan_favorite=?, reputasi=? WHERE id=?",[id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi, id], function (err, rows, fields){
		if(!!err){
			data["one_app"] = "Error mengupdate data";	
		}else{
			data["error"] = 0;
			data["one_app"] = "data berhasil diupdate";		
		}
		res.json(data);
	});
}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e :id, id_kat_user, email, username, password, nama_asli, tgl_lahir, pekerjaan, foto_profile, jurusan_favorite, reputasi)";
	res.json(data);

}
}); 

app.delete('/tbl_user', function (req, res){
	var id = req.body.id;
	var data = {
		"error":1,
		"one_app":""
	};
	if(!!id){
		connection.query("DELETE FROM tbl_user WHERE id=?",[id], function (err, rows, fields){
			if(!!err){
				data["tbl_user"] = "error delete data";
			}else{
				data["error"] = 0;
				data["tbl_user"] = " Delete user sukses";

			}
			res.json(data);
			
		});

	
}else{
	data["one_app"] = "Tolong lengkapi semua data (i.e :id)";
	res.json(data);
	}
});


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