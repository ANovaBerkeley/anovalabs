const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', function (req, res) {
	const userid = 1	
	// res.send('hello')
	//selects all from user where semester_user id's match with semesterid and userid
	// db.select()
	// .from(
	// 	 (
	const semid = db.select('semester.id')
		.from('user')
		.join('semester_user', 'semester_user.user_id', 'user.id')
		.join('semester', 'semester_user.semester_id', 'semester.id')
		.where('user.id', userid )


	const siteid = db.select('site.id')
		.from('semester')
		.join('user_semester_site','user_semester_site.semester_id','semester.id')
		.join('site','user_semester_site.site_id','site.id')
		.where('user_semester_site.user_id',userid)
		.where('semester.id',semid)	

	db.select('lesson.title', 'lesson.summary','lesson.link').from('site')
		.join('lesson_site','lesson_site.site_id','site.id')
		.join('lesson','lesson_site.lesson_id','lesson.id')
		.where('site.id',siteid)

	.then(function(data){
		res.send(data);
	});
});

module.exports= router;
