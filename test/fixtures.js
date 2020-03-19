const all_but_current_site = [
  {
    id: 1,
    title: 'Variables',
    summary: 'Introduction to variables ',
    link: 'http://tinyurl.com/variables',
  },
  {
    id: 2,
    title: 'Loops',
    summary: 'For loops and while loops',
    link: 'http://tinyurl.com/loops',
  },
  {
    id: 3,
    title: 'Lists:1',
    summary: 'First lesson on lists',
    link: 'http://tinyurl.com/lists1',
  },
  {
    id: 6,
    title: 'Control Statements',
    summary: 'Learn If and If Else Statements',
    link: 'http://tinyurl.com/if_else',
  },
  {
    id: 7,
    title: 'Functions',
    summary: 'Learn to create your own functions',
    link: 'http://tinyurl.com/functions',
  },
];

const lessons = [
  {
    id: 1,
    title: 'Variables',
    summary: 'Introduction to variables ',
    link: 'http://tinyurl.com/variables',
  },
  {
    id: 2,
    title: 'Loops',
    summary: 'For loops and while loops',
    link: 'http://tinyurl.com/loops',
  },
  {
    id: 3,
    title: 'Lists:1',
    summary: 'First lesson on lists',
    link: 'http://tinyurl.com/lists1',
  },
  {
    id: 4,
    title: 'Introduction to HTML',
    summary: 'Create personal websites',
    link: 'http://tinyurl.com/html_sites',
  },
  {
    id: 5,
    title: 'CSS',
    summary: 'Add color changes and more to personal websites',
    link: 'http://tinyurl.com/css_color',
  },
  {
    id: 6,
    title: 'Control Statements',
    summary: 'Learn If and If Else Statements',
    link: 'http://tinyurl.com/if_else',
  },
  {
    id: 7,
    title: 'Functions',
    summary: 'Learn to create your own functions',
    link: 'http://tinyurl.com/functions',
  },
];
const sitelessons = [
  {
    id: 4,
    title: 'Introduction to HTML',
    summary: 'Create personal websites',
    link: 'http://tinyurl.com/html_sites',
    date: '2019-01-05T08:00:00.000Z',
  },
  {
    id: 5,
    title: 'CSS',
    summary: 'Add color changes and more to personal websites',
    link: 'http://tinyurl.com/css_color',
    date: '2019-01-06T08:00:00.000Z',
  },
];
const newLesson = {
  title: 'Algorithms',
  summary: 'Face Off Activity',
  link: 'http://tinyurl.com/algorithms',
};
const newLessons = [
  {
    id: 1,
    title: 'Variables',
    summary: 'Introduction to variables ',
    link: 'http://tinyurl.com/variables',
  },
  {
    id: 2,
    title: 'Loops',
    summary: 'For loops and while loops',
    link: 'http://tinyurl.com/loops',
  },
  {
    id: 3,
    title: 'Lists:1',
    summary: 'First lesson on lists',
    link: 'http://tinyurl.com/lists1',
  },
  {
    id: 4,
    title: 'Introduction to HTML',
    summary: 'Create personal websites',
    link: 'http://tinyurl.com/html_sites',
  },
  {
    id: 5,
    title: 'CSS',
    summary: 'Add color changes and more to personal websites',
    link: 'http://tinyurl.com/css_color',
  },
  {
    id: 6,
    title: 'Control Statements',
    summary: 'Learn If and If Else Statements',
    link: 'http://tinyurl.com/if_else',
  },
  {
    id: 7,
    title: 'Functions',
    summary: 'Learn to create your own functions',
    link: 'http://tinyurl.com/functions',
  },
  {
    id: 8,
    title: 'Algorithms',
    summary: 'Face Off Activity',
    link: 'http://tinyurl.com/algorithms',
  },
];
const newret = { title: 'Algorithms' };
const delless = { id: 8 };
const newSiteLesson = {
  lesson_id: 7,
  site_id: 1,
  date: '2019-01-07T08:00:00.000Z',
};
const newSLessons = [
  { id: 1, lesson_id: 4, site_id: 1, date: '2019-01-06T08:00:00.000Z' },
  { id: 2, lesson_id: 5, site_id: 1, date: '2019-01-05T08:00:00.000Z' },
  { id: 3, lesson_id: 4, site_id: 2, date: '2019-01-05T08:00:00.000Z' },
  { id: 4, lesson_id: 5, site_id: 2, date: '2019-01-06T08:00:00.000Z' },
  { id: 5, lesson_id: 4, site_id: 3, date: '2019-01-05T08:00:00.000Z' },
  { id: 6, lesson_id: 5, site_id: 3, date: '2019-01-06T08:00:00.000Z' },
  { id: 7, lesson_id: 1, site_id: 4, date: '2019-01-05T08:00:00.000Z' },
  { id: 8, lesson_id: 2, site_id: 4, date: '2019-01-06T08:00:00.000Z' },
  { id: 9, lesson_id: 3, site_id: 4, date: '2019-01-05T08:00:00.000Z' },
  { id: 10, lesson_id: 6, site_id: 4, date: '2019-01-06T08:00:00.000Z' },
  { id: 11, lesson_id: 7, site_id: 4, date: '2019-01-05T08:00:00.000Z' },
  { id: 12, lesson_id: 1, site_id: 5, date: '2019-01-05T08:00:00.000Z' },
  { id: 13, lesson_id: 2, site_id: 5, date: '2019-01-06T08:00:00.000Z' },
  { id: 14, lesson_id: 3, site_id: 5, date: '2019-01-05T08:00:00.000Z' },
  { id: 15, lesson_id: 6, site_id: 5, date: '2019-01-06T08:00:00.000Z' },
  { id: 16, lesson_id: 7, site_id: 5, date: '2019-01-05T08:00:00.000Z' },
  { id: 17, lesson_id: 7, site_id: 2, date: '2019-01-07T08:00:00.000Z' },
];
const rosterMentor = [
  {
    name: 'user1',
    email: 'user1@email.com',
    picture: null,
    grade: 13,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user6',
    email: 'user6@email.com',
    picture: null,
    grade: 14,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user7',
    email: 'user7@email.com',
    picture: null,
    grade: 14,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user8',
    email: 'user8@email.com',
    picture: null,
    grade: 15,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user9',
    email: 'user9@email.com',
    picture: null,
    grade: 16,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
];
const roster = [
  {
    name: 'user10',
    email: 'user10@email.com',
    picture: null,
    grade: 6,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user11',
    email: 'user11@email.com',
    picture: null,
    grade: 7,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user12',
    email: 'user12@email.com',
    picture: null,
    grade: 6,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user13',
    email: 'user13@email.com',
    picture: null,
    grade: 8,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user14',
    email: 'user14@email.com',
    picture: null,
    grade: 6,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user15',
    email: 'user15@email.com',
    picture: null,
    grade: 8,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user16',
    email: 'user16@email.com',
    picture: null,
    grade: 6,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user17',
    email: 'user17@email.com',
    picture: null,
    grade: 7,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user18',
    email: 'user18@email.com',
    picture: null,
    grade: 8,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user19',
    email: 'user19@email.com',
    picture: null,
    grade: 6,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
  {
    name: 'user20',
    email: 'user20@email.com',
    picture: null,
    grade: 7,
    hobby: null,
    notes: 'Fall 2019, Montera',
  },
];
const profile1 = [
  {
    email: 'user1@email.com',
    picture: null,
    grade: 13,
    name: 'user1',
    hobby: null,
    notes: 'Fall 2019, Montera',
    role: 'mentor',
  },
];
const updatedNotes = {
  notes: 'Spring 2020, Montera',
  id: 1,
  grade: 13,
  hobby: 'this is a new hobby',
};
const updatedProfile = [
  {
    email: 'user1@email.com',
    picture: null,
    grade: 13,
    name: 'user1',
    hobby: 'this is a new hobby',
    notes: 'Spring 2020, Montera',
    role: 'mentor',
  },
];
const all_sites = [
  { schoolName: 'DCA', id: 1 },
  { schoolName: 'Montera', id: 2 },
  { schoolName: 'Willard', id: 3 },
  { schoolName: 'Fremont High', id: 4 },
  { schoolName: 'Rudsdale', id: 5 },
  { schoolName: 'Roosevelt', id: 6 },
  { schoolName: 'Lighthouse Charter', id: 7 },
  { schoolName: 'College Track', id: 8 },
  { schoolName: 'Squash Drive', id: 9 },
  { schoolName: 'Oakland Tech', id: 10 },
];

module.exports = {
  lessons,
  sitelessons,
  newLesson,
  newret,
  newLessons,
  newSiteLesson,
  newSLessons,
  rosterMentor,
  roster,
  profile1,
  updatedNotes,
  updatedProfile,
  all_but_current_site,
  all_sites,
  delless,
};
