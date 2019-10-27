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
        .get('/api/v1/routes/allLessons')
        .set('Accept', 'application/json')
        .expect(200)
        .then((response) =>{
            console.log(response.body);
            expect(response.body).to.deep.equal(fixtures.lessons);
             done();
        }).catch(function(error) {
            console.error(error);
            done();
          });

    });

    it('AllLessons', (done) =>{
            request(app)
            .get('/api/v1/routes/allLessons')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) =>{
                console.log(response.body);
                expect(response.body).to.deep.equal(fixtures.lessons);
                 done();
            }).catch(function(error) {
                console.error(error);
                done();
              });

        });

        
});