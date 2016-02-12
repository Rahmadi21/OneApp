var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
/*-------------include Model----------------*/

var userModel 			= require("./controller/controller_user.js");
var katUserModel		= require("./controller/controller_catUser.js");
var catContent			= require("./controller/controller_catContent.js");
var catContentIsi		= require("./controller/controller_catContentIsi.js");
var catCourse			= require("./controller/controller_catCourse.js");
var catPosition			= require("./controller/controller_catPosition.js");
var catResponse			= require("./controller/controller_catResponse.js");
var catUniform			= require("./controller/controller_catUniform.js");
var content				= require("./controller/controller_content.js");
var contentPhoto		= require("./controller/controller_contentPhoto.js");
var course				= require("./controller/controller_course.js");
var divisionFavorite	= require("./controller/controller_divisionFavorite.js");
var newsPivot			= require("./controller/controller_newsPivot.js");
var newsTag				= require("./controller/controller_newsTag.js");
var position			= require("./controller/controller_position.js");
var response			= require("./controller/controller_response.js"); 
var responseAttend		= require("./controller/controller_responseAttend.js"); 
var score				= require("./controller/controller_score.js"); 
var uniform 			= require("./controller/controller_uniform.js");
var report 				= require("./controller/controller_report.js");

/*-------------END INCLUDE------------------*/

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

/*===================Category User=======================*/

app.get('/cat_user', katUserModel.getKatUser);

app.post('/cat_user', katUserModel.postKatUser);

app.put('/cat_user', katUserModel.putKatUser);

app.delete('/cat_user', katUserModel.deleteKatUser);

/*--------------------------------------------------------*/

/*========================User=======================*/

app.get('/users', userModel.getuser);

app.get('/users/:id', userModel.getCatUser);

app.post('/users', userModel.postUser);

app.put('/users', userModel.putUser); 

app.delete('/users', userModel.deleteUser);

/*--------------------------------------------------------*/


/*========================== content =======================*/

app.get('/contents', content.getContent);

app.post('/contents', content.postContent);

app.put('/contents', content.putContent); 

app.delete('/contents', content.deleteContent);

/*--------------------------------------------------------*/

/*================= category content =======================*/

app.get('/contents/cat_content', catContent.getCatContent);

app.post('/contents/cat_content', catContent.postCatContent);

app.put('/contents/cat_content', catContent.putCatContent); 

app.delete('/contents/cat_content', catContent.deleteCatContent);

/*--------------------------------------------------------*/

/*================= Isi category content =======================*/

app.get('/contents/cat_content/:cat', catContentIsi.getCat);

app.post('/contents/cat_content/:cat', catContentIsi.postCat);

app.put('/contents/cat_content/:cat', catContentIsi.putCat);

app.delete('/contents/cat_content/:cat', catContentIsi.deleteCat);

/*--------------------------------------------------------*/

/*================= content Photo =======================*/

app.get('/contents/photos', contentPhoto.getContentPhoto);

app.post('/contents/photos', contentPhoto.postContentPhoto);

app.put('/contents/photos', contentPhoto.putContentPhoto); 

app.delete('/contents/photos', contentPhoto.deleteContentPhoto);

/*--------------------------------------------------------*/

/*================= category position =======================*/

app.get('/contents/cat_position', catPosition.getCatPosition);

app.post('/contents/cat_position', catPosition.postCatPosition);

app.put('/contents/cat_position', catPosition.putCatPosition); 

app.delete('/contents/cat_position', catPosition.deleteCatPosition);

/*--------------------------------------------------------*/

/*================= category uniform =======================*/

app.get('/contents/cat_uniform', catUniform.getCatUniform);

app.post('/contents/cat_uniform', catUniform.postCatUniform);

app.put('/contents/cat_uniform', catUniform.putCatUniform); 

app.delete('/contents/cat_uniform', catUniform.deleteCatUniform);


/*--------------------------------------------------------*/

/*================= category Course =======================*/

app.get('/contents/cat_course', catCourse.getCatCourse);

app.post('/contents/cat_course', catCourse.postCatCourse);

app.put('/contents/cat_course', catCourse.putCatCourse); 

app.delete('/contents/cat_course', catCourse.deleteCatCourse);

/*--------------------------------------------------------*/

/*========================= course =======================*/

app.get('/contents/cat_content/:cat/courses', course.getCourse);

app.post('/contents/cat_content/:cat/courses', course.postCourse);

app.put('/contents/cat_content/:cat/courses', course.putCourse); 

app.delete('/contents/cat_content/:cat/courses', course.deleteCourse);

/*--------------------------------------------------------*/

/*===================== score ===========================*/

app.get('/contents/cat_content/:cat/scores', score.getScore);
app.get('/contents/cat_content/:cat/scores/:jur')

app.post('/contents/cat_content/:cat/scores', score.postScore);

app.put('/contents/cat_content/:cat/scores', score.putScore); 

app.delete('/contents/cat_content/:cat/scores', score.deleteScore);

/*--------------------------------------------------------*/

/*======================= uniform =========================*/

app.get('/contents/cat_content/:cat/uniforms', uniform.getUniform);

app.post('/contents/cat_content/:cat/uniforms', uniform.postUniform);

app.put('/contents/cat_content/:cat/uniforms', uniform.putUniform); 

app.delete('/contents/cat_content/:cat/uniforms', uniform.deleteUniform);

/*--------------------------------------------------------*/

/*================= division favorite =======================*/

app.get('/contents/cat_content/:cat/favorites', divisionFavorite.getFavorite);

/*--------------------------------------------------------*/

/*================= category response =======================*/

app.get('/contents/cat_response', catResponse.getCatResponse);

app.post('/contents/cat_response', catResponse.postCatResponse);

app.put('/contents/cat_response', catResponse.putCatResponse); 

app.delete('/contents/cat_response', catResponse.deleteCatResponse);

/*--------------------------------------------------------*/

/*===================== response =======================*/

app.get('/contents/responses', response.getResponse);

app.post('/contents/responses', response.postResponse);

app.put('/contents/responses', response.putResponse); 

app.delete('/contents/responses', response.deleteResponse);

/*--------------------------------------------------------*/

/*================= response by category =======================*/

app.get('/contents/responses/:cat', responseAttend.getResponseAttend);

/*--------------------------------------------------------*/

/*==================== news pivot ==========================*/

app.get('/contents/cat_content/:cat/pivot', newsPivot.getNewsPivot);

/*--------------------------------------------------------*/

/*===================== news tag ==========================*/

app.get('/contents/cat_content/:cat/tags', newsTag.getNewsTag);

app.post('/contents/cat_content/:cat/tags', newsTag.postNewsTag);

app.put('/contents/cat_content/:cat/tags', newsTag.putNewsTag); 

app.delete('/contents/cat_content/:cat/tags', newsTag.deleteNewsTag);

/*--------------------------------------------------------*/

/*===================== REPORT ==========================*/

app.get('/reports', report.getReport);

app.post('/reports', report.postReport);

app.put('/reports', report.putReport); 

app.delete('/reports', report.deleteReport);

/*--------------------------------------------------------*/

/*==================== position =======================*/

app.get('/contents/cat_content/:cat/ket_jabatan', position.getPosition);

app.post('/contents/cat_content/:cat/ket_jabatan', position.postPosition);

app.put('/contents/cat_content/:cat/ket_jabatan', position.putPosition); 

app.delete('/contents/cat_content/:cat/ket_jabatan', position.deletePosition);

/*--------------------------------------------------------*/

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});