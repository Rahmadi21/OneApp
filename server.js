/*------------REQUIRE DEPENDENCY ----------*/
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var mysql = require('mysql');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
var path = require('path');
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
var prestation			= require("./controller/controller_prestation.js");
var presPivot			= require("./controller/controller_prestationPivot.js")
var response			= require("./controller/controller_response.js"); 
var responseAttend		= require("./controller/controller_responseAttend.js"); 
var score				= require("./controller/controller_score.js"); 
var uniform 			= require("./controller/controller_uniform.js");
var report 				= require("./controller/controller_report.js");
var welcome				= require("./controller/controller_welcome.js");
var peserta 			= require('./controller/controller_pesertaPrestasi.js');
var conn 		= require('./config/conn.js')
var connection  = mysql.createConnection(conn);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/bower_components',express.static('bower_components'));
app.use('/app',express.static('app'));
app.use('/asset',express.static('asset'));
app.use('/templates',express.static('templates'));

app.get('/admin',function(req,res){
	var option={
		root:__dirname
	};
	res.sendFile('index.html',option);
})
/* --------------------- API ---------------------- */

app.get('/', welcome.get);
app.get('/api', welcome.getApi)


/*===================Category User=======================*/

app.get('/api/cat_user', katUserModel.getKatUser);

app.post('/api/cat_user', katUserModel.postKatUser);

app.put('/api/cat_user', katUserModel.putKatUser);

app.delete('/api/cat_user/:id', katUserModel.deleteKatUser);

/*--------------------------------------------------------*/

/*========================User=======================*/

app.get('/api/users', userModel.getuser);

app.get('/api/users/:id', userModel.getCatUser);

app.post('/api/users', userModel.postUser);

app.put('/api/users', userModel.putUser); 

app.delete('/api/users/:id', userModel.deleteUser);

/*--------------------------------------------------------*/


/*========================== content =======================*/

app.get('/api/contents', content.getContent);

app.post('/api/contents', content.postContent);

app.put('/api/contents', content.putContent); 

app.delete('/api/contents/:id', content.deleteContent);

/*--------------------------------------------------------*/

/*================= category content =======================*/

app.get('/api/contents/cat_content', catContent.getCatContent);

app.post('/api/contents/cat_content', catContent.postCatContent);

app.put('/api/contents/cat_content', catContent.putCatContent); 

app.delete('/api/contents/cat_content/:id', catContent.deleteCatContent);

/*--------------------------------------------------------*/

/*================= Isi category content =======================*/

app.get('/api/contents/cat_content/:cat', catContentIsi.getCat);

app.post('/api/contents/cat_content/:cat', catContentIsi.postCat);

app.put('/api/contents/cat_content/:cat', catContentIsi.putCat);

app.delete('/api/contents/cat_content/:cat/:id', catContentIsi.deleteCat);

/*--------------------------------------------------------*/

/*================= content Photo =======================*/

app.get('/api/contents/photos', contentPhoto.getContentPhoto);

app.post('/api/contents/photos', contentPhoto.postContentPhoto);

app.put('/api/contents/photos', contentPhoto.putContentPhoto); 

app.delete('/api/contents/photos/:id', contentPhoto.deleteContentPhoto);

/*--------------------------------------------------------*/

/*================= category position =======================*/

app.get('/api/contents/cat_position', catPosition.getCatPosition);

app.post('/api/contents/cat_position', catPosition.postCatPosition);

app.put('/api/contents/cat_position', catPosition.putCatPosition); 

app.delete('/api/contents/cat_position/:id', catPosition.deleteCatPosition);

/*--------------------------------------------------------*/

/*================= category uniform =======================*/

app.get('/api/contents/cat_uniform', catUniform.getCatUniform);

app.post('/api/contents/cat_uniform', catUniform.postCatUniform);

app.put('/api/contents/cat_uniform', catUniform.putCatUniform); 

app.delete('/api/contents/cat_uniform/:id', catUniform.deleteCatUniform);


/*--------------------------------------------------------*/

/*================= category Course =======================*/

app.get('/api/contents/cat_course', catCourse.getCatCourse);

app.post('/api/contents/cat_course', catCourse.postCatCourse);

app.put('/api/contents/cat_course', catCourse.putCatCourse); 

app.delete('/api/contents/cat_course/:id', catCourse.deleteCatCourse);

/*--------------------------------------------------------*/

/*========================= course =======================*/

app.get('/api/contents/cat_content/:cat/courses', course.getCourse);

app.post('/api/contents/cat_content/:cat/courses', course.postCourse);

app.put('/api/contents/cat_content/:cat/courses', course.putCourse); 

app.delete('/api/contents/cat_content/:cat/courses/:id', course.deleteCourse);

/*--------------------------------------------------------*/

/*===================== score ===========================*/

app.get('/api/contents/cat_content/:cat/scores', score.getScore);
app.get('/api/contents/cat_content/:cat/scores/all', score.getScoreAll);

app.post('/api/contents/cat_content/:cat/scores', score.postScore);

app.put('/api/contents/cat_content/:cat/scores', score.putScore); 

app.delete('/api/contents/cat_content/:cat/scores/:id', score.deleteScore);

/*--------------------------------------------------------*/

/*======================= uniform =========================*/

app.get('/api/contents/cat_content/:cat/uniforms', uniform.getUniform);

app.post('/api/contents/cat_content/:cat/uniforms', uniform.postUniform);

app.put('/api/contents/cat_content/:cat/uniforms', uniform.putUniform); 

app.delete('/api/contents/cat_content/:cat/uniforms/:id', uniform.deleteUniform);

/*--------------------------------------------------------*/

/*================= division favorite =======================*/

app.get('/api/contents/cat_content/:cat/favorites', divisionFavorite.getFavorite);

/*--------------------------------------------------------*/

/*================= category response =======================*/

app.get('/api/contents/cat_response', catResponse.getCatResponse);

app.post('/api/contents/cat_response', catResponse.postCatResponse);

app.put('/api/contents/cat_response', catResponse.putCatResponse); 

app.delete('/api/contents/cat_response/:id', catResponse.deleteCatResponse);

/*--------------------------------------------------------*/

/*===================== response =======================*/

app.get('/api/contents/responses', response.getResponse);

app.post('/api/contents/responses', response.postResponse);

app.put('/api/contents/responses', response.putResponse); 

app.delete('/api/contents/responses/:id', response.deleteResponse);

/*--------------------------------------------------------*/

/*================= response by category =======================*/

app.get('/api/contents/responses/:cat', responseAttend.getResponseAttend);

/*--------------------------------------------------------*/

/*==================== news pivot ==========================*/

app.get('/api/contents/cat_content/:cat/pivot', newsPivot.getNewsPivot);
app.post('/api/contents/cat_content/:cat/pivot', newsPivot.postNewsPivot);
app.delete('/api/contents/cat_content/:cat/pivot/:id', newsPivot.deleteNewsPivot);

/*--------------------------------------------------------*/

/*===================== news tag ==========================*/

app.get('/api/contents/cat_content/:cat/tags', newsTag.getNewsTag);

app.post('/api/contents/cat_content/:cat/tags', newsTag.postNewsTag);

app.put('/api/contents/cat_content/:cat/tags', newsTag.putNewsTag); 

app.delete('/api/contents/cat_content/:cat/tags/:id', newsTag.deleteNewsTag);

/*--------------------------------------------------------*/

/*===================== REPORT ==========================*/

app.get('/api/reports', report.getReport);

app.post('/api/reports', report.postReport);

app.put('/api/reports', report.putReport); 

app.delete('/api/reports/:id', report.deleteReport);

/*--------------------------------------------------------*/

/*==================== position =======================*/

app.get('/api/contents/cat_content/:cat/kat_jabatan', position.getPosition);

app.post('/api/contents/cat_content/:cat/kat_jabatan', position.postPosition);

app.put('/api/contents/cat_content/:cat/kat_jabatan', position.putPosition); 

app.delete('/api/contents/cat_content/:cat/kat_jabatan/:id', position.deletePosition);

/*--------------------------------------------------------*/

/*==================== prestation =======================*/

app.get('/api/contents/cat_content/:cat/kat_prestasi', prestation.getPrestation);

app.post('/api/contents/cat_content/:cat/kat_prestasi', prestation.postPrestation);

app.put('/api/contents/cat_content/:cat/kat_prestasi', prestation.putPrestation); 

app.delete('/api/contents/cat_content/:cat/kat_prestasi/:id', prestation.deletePrestation);

/*--------------------------------------------------------*/
/*==================== prestation =======================*/

app.get('/api/contents/cat_content/:cat/prestasi_pivot', presPivot.getPresPivot);
app.post('/api/contents/cat_content/:cat/prestasi_pivot', presPivot.postPrestasiPivot);
app.delete('/api/contents/cat_content/:cat/prestasi_pivot/:id', presPivot.deletePrestasiPivot);

/*--------------------------------------------------------*/
/*==================== peserta prestation =======================*/

app.get('/api/contents/cat_content/:cat/peserta', peserta.getPesertaPrestasi);

app.post('/api/contents/cat_content/:cat/peserta', peserta.postPesertaPrestasi);

app.put('/api/contents/cat_content/:cat/peserta', peserta.putPesertaPrestasi); 

app.delete('/api/contents/cat_content/:cat/peserta/:id', peserta.deletePesertaPrestasi);

/*--------------------------------------------------------*/

/*---------------- END API ---------------------*/

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});