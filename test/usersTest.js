'use strict';
process.env.NODE_ENV = 'test';
const request = require('supertest');
const {suite, test} = require('mocha');
const server = require('../index.js')
const {addDatabaseHooks} = require('./databaseHooks');

suite('hitting /users endpoint', addDatabaseHooks(() => {
        suite('happy path here', () => {
            let agent = request.agent(server)
            let token;

            beforeEach(done => {
                request(server).post('/token')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'chuckhagy',
                        password: 'secret'
                    })
                    .end((error, res) => {
                        if (error) {
                            return done(error)
                        }
                        token = res.body.token;
                        done();
                    })
            });

            test('get /users', done => {

                agent.get('/users').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body[0].created_at;
                        delete res.body[0].updated_at;

                    })
                    .expect(200, [{
                            "displayName": "Chuck Hagy                      ",
                            "email": "chuckhagy@gmail.com                                         ",
                            "id": 1,
                            "profileColor": "#c90000",
                            "role": "admin                           ",
                            "statusMessage": "Crushing. It.",
                            "username": "chuckhagy                       "
                        }],
                        done);
            })
            //test()
        })
    })
);