const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', function (req, res) {
	// res.send('hello')
	//selects all from user where semester_user id's match with semesterid and userid
	db.select()
	.from(
		CREATE VIEW as "newsite" as (
		db.select()
		.from(
			CREATE VIEW "sem" as (
			db.select()
			.from('user')
			.leftjoin('semester_user', 'semester_user.user_id', 'user.user_id')
			.leftjoin('semester', 'semester_user.semester_id', 'semester.semester_id')
			//.leftjoin('semester_site', 'semester_site.semester_id', 'semester.semester_id')
			.where('user.user_id', 1)//temp, 1 should be current user
			)
		)
		.leftjoin('semester_site', 'semester_site.semester_id', 'sem.semester_id')
		.leftjoin('site', 'semester_site.site_id', 'site.site_id')
		.where('sem.semester_id', 1)
		)
	)
	.leftjoin('lesson_site', 'lesson_site.site_id', 'newsite.site_id')
	.leftjoin('lesson', 'lesson_site.lesson_id', 'lesson.lesson_id')
	.where('newsite.site_id', 1)

	.then(function(data){
		res.send(data);
	});
});

module.exports= router;
