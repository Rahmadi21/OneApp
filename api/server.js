var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
/*-------------include Model----------------*/

var userModel 			= require("./models/tbl_user.js");
var katUserModel		= require("./models/tbl_kat_user.js");
var catContent			= require("./models/catContent.js");
var catCourse			= require("./models/catCourse.js");
var catPosition			= require("./models/catPosition.js");
var catResponse			= require("./models/catResponse.js");
var catUniform			= require("./models/catUniform.js");
var club				= require("./models/club.js");
var content				= require("./models/content.js");
var contentPhoto		= require("./models/contentPhoto.js");
var course				= require("./models/course.js");
var division			= require("./models/division.js");
var divisionFavorite	= require("./models/divisionFavorite.js");
var events				= require("./models/event.js");
var news				= require("./models/news.js");
var newsPivot			= require("./models/newsPivot.js");
var newsTag				= require("./models/newsTag.js");
var position			= require("./models/position.js");
var response			= require("./models/response.js"); 
var responseAttend		= require("./models/responseAttend.js"); 
var responseComment		= require("./models/responseComment.js"); 
var responseLike		= require("./models/responseLike.js"); 
var responseReply		= require("./models/responseReply.js"); 
var score				= require("./models/score.js"); 
var uniform 			= require("./models/uniform.js");

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

app.post('/users', userModel.postUser);

app.put('/users', userModel.putUser); 

app.delete('/users', userModel.deleteUser);

/*--------------------------------------------------------*/

/*================= category content =======================*/

app.get('/cat_content', catContent.getCatContent);

app.post('/cat_content', catContent.postCatContent);

app.put('/cat_content', catContent.putCatContent); 

app.delete('/cat_content', catContent.deleteCatContent);

/*--------------------------------------------------------*/

/*========================== content =======================*/

app.get('/contents', content.getContent);

app.post('/contents', content.postContent);

app.put('/contents', content.putContent); 

app.delete('/contents', content.deleteContent);

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

/*==================== position =======================*/

app.get('/contents/positions', position.getPosition);

app.post('/contents/positions', position.postPosition);

app.put('/contents/positions', position.putPosition); 

app.delete('/contents/positions', position.deletePosition);

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

/*======================= division =======================*/

app.get('/contents/divisions', division.getDivision);

app.post('/contents/divisions', division.postDivision);

app.put('/contents/divisions', division.putDivision); 

app.delete('/contents/divisions', division.deleteDivision);

/*--------------------------------------------------------*/

/*========================= course =======================*/

app.get('/contents/divisions/courses', course.getCourse);

app.post('/contents/divisions/courses', course.postCourse);

app.put('/contents/divisions/courses', course.putCourse); 

app.delete('/contents/divisions/courses', course.deleteCourse);

/*--------------------------------------------------------*/

/*===================== score ===========================*/

app.get('/contents/divisions/scores', score.getScore);

app.post('/contents/divisions/scores', score.postScore);

app.put('/contents/divisions/scores', score.putScore); 

app.delete('/contents/divisions/scores', score.deleteScore);

/*--------------------------------------------------------*/

/*======================= uniform =========================*/

app.get('/contents/divisions/uniforms', uniform.getUniform);

app.post('/contents/divisions/uniforms', uniform.postUniform);

app.put('/contents/divisions/uniforms', uniform.putUniform); 

app.delete('/contents/divisions/uniforms', uniform.deleteUniform);

/*--------------------------------------------------------*/

/*================= division favorite =======================*/

app.get('/contents/divisions/favorites', divisionFavorite.getFavorite);

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

/*================= response attend =======================*/

app.get('/contents/responses/attends', responseAttend.getResponseAttend);

/*--------------------------------------------------------*/

/*================= response comment =======================*/

app.get('/contents/responses/comments', responseComment.getResponseComment);

/*--------------------------------------------------------*/

/*================= response like =======================*/

app.get('/contents/responses/likes', responseLike.getResponseLike);

/*--------------------------------------------------------*/

/*================= response reply =======================*/

app.get('/contents/responses/reply', responseReply.getResponseReply);

/*--------------------------------------------------------*/

/*========================== club =============================*/

app.get('/contents/club', club.getClub);

app.post('/contents/club', club.postClub);

app.put('/contents/club', club.putClub); 

app.delete('/contents/club', club.deleteClub);

/*--------------------------------------------------------*/

/*======================== event ============================*/

app.get('/contents/events', events.getEvents);

app.post('/contents/events', events.postEvents);

app.put('/contents/events', events.putEvents); 

app.delete('/contents/events', events.deleteEvents);

/*--------------------------------------------------------*/

/*======================= news =============================*/

app.get('/contents/news', news.getNews);

app.post('/contents/news', news.postNews);

app.put('/contents/news', news.putNews); 

app.delete('/contents/news', news.deleteNews);

/*--------------------------------------------------------*/

/*==================== news pivot ==========================*/

app.get('/contents/news/pivot', newsPivot.getNewsPivot);

/*--------------------------------------------------------*/

/*===================== news tag ==========================*/

app.get('/contents/news/tags', newsTag.getNewsTag);

app.post('/contents/news/tags', newsTag.postNewsTag);

app.put('/contents/news/tags', newsTag.putNewsTag); 

app.delete('/contents/news/tags', newsTag.deleteNewsTag);

/*--------------------------------------------------------*/

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});