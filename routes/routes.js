const AuthController = require('../controllers/auth_controller');
const SitesController = require('../controllers/sites_controller');
const LessonsController = require('../controllers/lessons_controller');
const LessonSitesController = require('../controllers/lesson_sites_controller');
const ProfilesController = require('../controllers/profiles_controller');
const RostersController = require('../controllers/rosters_controller');
const Middleware = require('../middleware/jwt');

module.exports = app => {
  //Token Middleware
  app.use(Middleware.checkTokenSetAccount);

  //authentication
  app.post('/api/v1/auth', AuthController.checkAuth);
  app.post('/api/v1/auth/signup', AuthController.signup);
  app.post('/api/v1/auth/login', AuthController.login);

  //Site
  app.get('/api/v1/site/allSites', SitesController.index);
  app.get('/api/v1/site/current', SitesController.getCurrentUserSite);
  app.post('/api/v1/site/addUserSemSite', SitesController.addUserToSemSite);

  //Lessons
  app.get('/api/v1/lessons/all', LessonsController.index);
  app.get('/api/v1/lessons/:id', LessonsController.getLessonById);
  app.post('/api/v1/lessons/add', LessonsController.create);
  app.post('/api/v1/lessons/update', LessonsController.update);
  app.post('/api/v1/lessons/updatePage', LessonsController.updatePage);
  app.post('/api/v1/lessons/delete', LessonsController.deleteLesson);
  app.get('/api/v1/lessons/get_feedback', LessonsController.getFeedback);
  app.post('/api/v1/lessons/submit_feedback', LessonsController.submitFeedback);

  //Lesson Site
  app.get('/api/v1/lesson_site/all', LessonSitesController.getAllSemAndSiteLessons);
  app.get(
    '/api/v1/lesson_site/all_but_current_site',
    LessonSitesController.getOtherSiteLessons,
  );
  app.post('/api/v1/lesson_site/add', LessonSitesController.addLessonToSite);
  app.post('/api/v1/lesson_site/delete', LessonSitesController.deleteLessonFromSite);
  app.post('/api/v1/lesson_site/update', LessonSitesController.update);

  //Profile
  app.get('/api/v1/profile/:id', ProfilesController.getProfileById);
  app.post('/api/v1/profile/update', ProfilesController.update);

  //Roster
  app.get('/api/v1/roster', RostersController.getUsersBySite);
  app.post('/api/v1/roster/update', RostersController.update);
};
