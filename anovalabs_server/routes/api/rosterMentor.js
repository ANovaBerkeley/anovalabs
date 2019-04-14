const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', function (req, res) {
	const userid = 1
	const semesterid = 1
	const roleType = "mentor"
	// res.send('hello')
	//selects all from user where semester_user id's match with semesterid and userid
	// db.select()
	// .from(
	// 	 (
	// const semid = db.select('semester.id')
	// 	.from('user')
	// 	.join('semester_user', 'semester_user.user_id', 'user.id')
	// 	.join('semester', 'semester_user.semester_id', 'semester.id')
	// 	.where('user.id', userid )


	const siteid = db.select('user_semester_site.site_id')
		.from('user_semester_site')
		//.join('user', 'user_semester_site.user_id','user.id')
		//.join('semester','user_semester_site.semester_id','semester.id')
		.where('user_semester_site.user_id', userid)
		.where('user_semester_site.semester_id', semesterid)
	//const siteid = 1
		//.where('user_semester_site.semester_id', semesterid)
		//.where('user_semester_site.user_id',userid)
		//.where('semester.id',semid)
	//console.log(siteid);

	//db.select().from('site').where('site.id', siteid)
	db.select('name')
		.from('user_semester_site')
		.rightJoin('user_role', 'user_role.user_id', 'user_semester_site.user_id')
		.rightJoin('role', 'role.id', 'role_id')
		.rightJoin('user', 'user.id', 'user_semester_site.user_id')
		.where('user_semester_site.site_id', siteid)
		.where('user_semester_site.semester_id', semesterid)
		.where('roleName', roleType)


	// db.select('lesson.title', 'lesson.summary','lesson.link').from('site')
	// 	.join('lesson_site','lesson_site.site_id','site.id')
	// 	.join('lesson','lesson_site.lesson_id','lesson.id')
	// 	.where('site.id',siteid)

	.then(function(data){
		res.send(data);
	});
});

module.exports= router;
