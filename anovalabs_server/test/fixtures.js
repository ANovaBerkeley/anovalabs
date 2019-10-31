const lesson_site =
  [ { lesson_id: 3, site_id: 2, date: '2019-01-03T08:00:00.000Z' },
    { lesson_id: 4, site_id: 2, date: '2019-01-04T08:00:00.000Z' },
    { lesson_id: 5, site_id: 3, date: '2019-01-05T08:00:00.000Z' },
    { lesson_id: 6, site_id: 3, date: '2019-01-06T08:00:00.000Z' },
    { lesson_id: 7, site_id: 3, date: '2019-01-07T08:00:00.000Z' }
]
const lessons =  [ { id: 1,
       title: 'Lesson 1 for site1fa18',
       summary: 'this is the 1st lesson for s1fa18',
       link: 'http://tinyurl.com/lesson1s1fa18' },
     { id: 2,
       title: 'Lesson 2 for site 1fa18',
       summary: '2nd lesson s1fa18',
       link: 'http://tinyurl.com/lesson2s1fa18' },
     { id: 3,
       title: 'Lesson 1 for site1sp19',
       summary: 'this is the 1st lesson for s1sp19',
       link: 'http://tinyurl.com/lesson1s1sp19' },
     { id: 4,
       title: 'Lesson 2 for site1sp19',
       summary: '2nd lesson s1sp19',
       link: 'http://tinyurl.com/lesson2s1sp19' },
     { id: 5,
       title: 'Lesson 1 for site2sp19',
       summary: '1st lesson s2sp19',
       link: 'http://tinyurl.com/lesson1s2sp19' },
     { id: 6,
       title: 'Lesson 2 for site2sp19',
       summary: '2nd lesson s2sp19',
       link: 'http://tinyurl.com/lesson2s2sp19' },
     { id: 7,
       title: 'Lesson 3 for site2sp19',
       summary: '3rd lesson s2sp19',
       link: 'http://tinyurl.com/lesson3s2sp19' } ];
const sitelessons = [{"title":"Lesson 1 for site1fa18","summary":"this is the 1st lesson for s1fa18","link":"http://tinyurl.com/lesson1s1fa18","date":"2019-01-01T08:00:00.000Z"},{"title":"Lesson 2 for site 1fa18","summary":"2nd lesson s1fa18","link":"http://tinyurl.com/lesson2s1fa18","date":"2019-01-02T08:00:00.000Z"}];
const newLesson = {"title":"Lesson 5 for site1fa18","summary":"this is the 5th lesson for s1fa18","link":"http://tinyurl.com/lesson5s1fa18"};
const newLessons = [ { id: 1,
       title: 'Lesson 1 for site1fa18',
       summary: 'this is the 1st lesson for s1fa18',
       link: 'http://tinyurl.com/lesson1s1fa18' },
     { id: 2,
       title: 'Lesson 2 for site 1fa18',
       summary: '2nd lesson s1fa18',
       link: 'http://tinyurl.com/lesson2s1fa18' },
     { id: 3,
       title: 'Lesson 1 for site1sp19',
       summary: 'this is the 1st lesson for s1sp19',
       link: 'http://tinyurl.com/lesson1s1sp19' },
     { id: 4,
       title: 'Lesson 2 for site1sp19',
       summary: '2nd lesson s1sp19',
       link: 'http://tinyurl.com/lesson2s1sp19' },
     { id: 5,
       title: 'Lesson 1 for site2sp19',
       summary: '1st lesson s2sp19',
       link: 'http://tinyurl.com/lesson1s2sp19' },
     { id: 6,
       title: 'Lesson 2 for site2sp19',
       summary: '2nd lesson s2sp19',
       link: 'http://tinyurl.com/lesson2s2sp19' },
     { id: 7,
       title: 'Lesson 3 for site2sp19',
       summary: '3rd lesson s2sp19',
       link: 'http://tinyurl.com/lesson3s2sp19' },
     { id: 8,
       title: 'Lesson 5 for site1fa18',
       summary: 'this is the 5th lesson for s1fa18',
       link: 'http://tinyurl.com/lesson5s1fa18' } ];
const newret = {"title":"Lesson 5 for site1fa18"};
const newSiteLesson = {"lesson_id" : 7, "site_id" : 1, "date":"2019-01-07T08:00:00.000Z" };
const newSLessons = [{"id":1,"lesson_id":1,"site_id":1,"date":"2019-01-01T08:00:00.000Z"},{"id":2,"lesson_id":2,"site_id":1,"date":"2019-01-02T08:00:00.000Z"},{"id":3,"lesson_id":3,"site_id":2,"date":"2019-01-03T08:00:00.000Z"},{"id":4,"lesson_id":4,"site_id":2,"date":"2019-01-04T08:00:00.000Z"},{"id":5,"lesson_id":5,"site_id":3,"date":"2019-01-05T08:00:00.000Z"},{"id":6,"lesson_id":6,"site_id":3,"date":"2019-01-06T08:00:00.000Z"},{"id":7,"lesson_id":7,"site_id":3,"date":"2019-01-07T08:00:00.000Z"}, {"id":8, "lesson_id" : 7, "site_id" : 1, "date":"2019-01-07T08:00:00.000Z"}]
const rosterMentor = [{"name":"user1","email":"user1@email.com","picture":null,"grade":12,"bio":null,"notes":"Fall 2018, Site1"}]
const rosterStudent = [{"name":"user2","email":"user2@email.com","picture":null,"grade":12,"bio":null,"notes":"Sp19,Site1"},{"name":"user3","email":"user3@email.com","picture":null,"grade":12,"bio":null,"notes":"sp19,site2"}]
const profile1 = [{"email": "user1@email.com", "picture": null, "grade": 12, "name": "user1", "bio": null, "notes": "Fall 2018, Site1"}];
const updatedNotes = {"notes": "Fall 2018, Site 2", "id": 1, "grade": 11, "bio": "this is a new bio"};
const updatedProfile = [{"email": "user1@email.com", "picture": null, "grade": 11, "name": "user1", "bio": "this is a new bio", "notes": "Fall 2018, Site 2"}];

module.exports = {
  lessons,
  sitelessons,
  newLesson,
  newret,
  newLessons,
  newSiteLesson,
  newSLessons,
  rosterMentor,
  rosterStudent,
  profile1,
  updatedNotes,
  updatedProfile,
  lesson_site
};
