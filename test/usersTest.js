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
            test('GET /users', done => {

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
            });
            test('GET /users/ by id', done => {

                agent.get('/users/1').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(200, {
                            id: 1,
                            username: 'chuckhagy                       ',
                            role: 'admin                           ',
                            displayName: 'Chuck Hagy                      ',
                            statusMessage: 'Crushing. It.',
                            email: 'chuckhagy@gmail.com                                         ',
                            profileColor: '#c90000'
                        }
                        ,
                        done);
            });
            test('POST /users NEW USER', done => {

                agent.post('/users').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token)
                    .send({
                        username: 'chuckz',
                        email: 'chuckz@gmail.com',
                        password: 'secret',
                        displayName: 'Chuckz',
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(201, {
                            id: 2,
                            username: 'chuckz                          ',
                            role: 'basic                           ',
                            displayName: 'Chuckz                          ',
                            statusMessage: 'Hi everyone!',
                            email: 'chuckz@gmail.com                                            ',
                            profileColor: '#c90000'
                        }
                        ,
                        done);
            });
            test('PATCH /users/ by id', done => {

                agent.patch('/users/1').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token)
                    .send({
                        statusMessage: 'yo',
                        email: 'chuckz@gmail.com',
                        profileColor: '#c90000',
                        displayName: 'Chuckzz',
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(200, { id: 1,
                            username: 'chuckhagy                       ',
                            role: 'admin                           ',
                            displayName: 'Chuckzz                         ',
                            statusMessage: 'yo',
                            email: 'chuckz@gmail.com                                            ',
                            profileColor: '#c90000' }
                        ,
                        done);
            });
            test('DELETE /users/ by id', done => {

                agent.delete('/users/1').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(202, {
                            id: 1,
                            username: 'chuckhagy                       ',
                            role: 'admin                           ',
                            displayName: 'Chuck Hagy                      ',
                            statusMessage: 'Crushing. It.',
                            email: 'chuckhagy@gmail.com                                         ',
                            profileColor: '#c90000'
                        }
                        ,
                        done);
            });

        })
    })
);