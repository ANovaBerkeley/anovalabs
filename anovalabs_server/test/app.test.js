const knex = require('../db/knex')
describe('DB Test', () =>{
    before((done) =>{
        knex.migrate.latest()
            .then(() =>{
                return knex.seed.run()

            }).then(() => done());
    });

    it('Works...', () =>{
        console.log('Working!');

    });
});