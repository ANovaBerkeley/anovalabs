const knex = require('../db/knex');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const fixtures = require('./fixtures')

describe('DB Test', () =>{
    before((done) =>{
        knex.migrate.latest()
            .then(() =>{
                return knex.seed.run()

            }).then(() => done());
    });

    it('AllLessons', (done) =>{
        request(app)
        .get('/api/v1/lessons/all')
        .expect(200)
        .then((response) =>{
            expect(response.body).to.deep.equal(fixtures.lessons);
             done();
        }).catch(function(error) {
            console.error(error);
            done();
        });

    });

    it('SiteLessons1', (done) =>{
        request(app)
        .get('/api/v1/lesson_site/all')
        .expect(200)
        .then((response) =>{
            expect(response.body).to.deep.equal(fixtures.sitelessons);
            done();
        }).catch(function(error) {
            console.error(error);
            done();
        });

    });

  it('AddLesson', (done) => {
    request(app)
      .post('/api/v1/lessons/add')
      .send(fixtures.newLesson)
      .expect(201)
      .then((response) => {
        expect(response.body).to.deep.equal(fixtures.newret);
        done();
      }).catch(function(error) {
           console.error(error);
           done();
      });

  });

    it('VerifyDatabase', (done) =>{
        request(app)
        .get('/api/v1/lessons/all')
        .expect(200)
        .then((response) =>{

            expect(response.body).to.deep.equal(fixtures.newLessons);
             done();
        }).catch(function(error) {
            console.error(error);
            done();
        });

    });



  it('DeleteLesson', (done) => {
    request(app)
      .post('/api/v1/lessons/delete')
      .send(fixtures.newret)
      .expect(201)
      .then((response) => {
        expect(response.body).to.deep.equal(fixtures.newret);
        done();
      }).catch(function(error) {
           console.error(error);
           done();
      });

  });

    it('VerifyDatabase2', (done) =>{
        request(app)
        .get('/api/v1/lessons/all')
        .expect(200)
        .then((response) =>{
            expect(response.body).to.deep.equal(fixtures.lessons);
             done();
        }).catch(function(error) {
            console.error(error);
            done();
        });

    });


        it('AddSiteLesson', (done) =>{
            request(app)
            .post('/api/v1/lesson_site/addLessonSite')
            .send(fixtures.newSiteLesson)
            .expect(201)
            .then((response) =>{
                console.log(response.body);
                 done();
            }).catch(function(error) {
                console.error(error);
                done();
            });

        });



    it('Verify Site Lesson Added', (done) =>{
        request(app)
        .get('/api/v1/lesson_site')
        .expect(200)
        .then((response) =>{
            expect(response.body).to.deep.equal(fixtures.newSLessons);
             done();
        }).catch(function(error) {
            console.error(error);
            done();
        });

    });

});
