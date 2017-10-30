process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const EntityRepository = require('./EntityRepository');

describe('Test suit for entityRepository', () => {
    const db = knex({client: 'pg'});
    let entityRepository = null;
    let knexTracker = null;

    beforeAll(() => {
        KnexMock.mock(db);
        entityRepository = new EntityRepository({
            entityName: 'Entity',
            db,
            logError: console.error // eslint-disable-line no-console
        });
    });

    beforeEach(() => {
        knexTracker = KnexMock.getTracker();
        knexTracker.install();
    });


    describe('getAll method', () => {
        it('get an array of objects', async () => {


            const expectedEntity = [{object: 1}, {object: 2}];

            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('select');
                query.response(expectedEntity);
            });
            const actualEntity = await entityRepository.getAll();
            expect(actualEntity).toEqual(expectedEntity);
        });
        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('select');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.getAll();
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });



    describe('getById method', () => {
        it('get an object back', async () => {

            const inputEntity = 1;
            const expectedEntity = {object: 1};

            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('select');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.getById(inputEntity);
            expect(actualEntity).toEqual(expectedEntity);
        });

        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                const inputEntity = 1;
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('select');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.getById(inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });

    describe('getGoalsByAssignment method', () => {
        it('get an object back', async () => {

            const inputEntity = 1;
            const expectedEntity = {object: 1};

            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('select');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.getGoalsByAssignment(inputEntity);
            expect(actualEntity).toEqual([expectedEntity]);
        });

        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                const inputEntity = 1;
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('select');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.getGoalsByAssignment(inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });

    describe('getUsersByAssignment method', () => {
        it('get an object back', async () => {

            const inputEntity = 1;
            const expectedEntity = {object: 1};

            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('select');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.getUsersByAssignment(inputEntity);
            expect(actualEntity).toEqual([expectedEntity]);
        });

        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                const inputEntity = 1;
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('select');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.getUsersByAssignment(inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });

    describe('updateById method', () => {
        it('get an object back', async () => {

            const inputEntity = {
                title: "Win a million dollars",
                body: 'Test body here',
                priority: 3,
                dueDate: "2017-11-28T16:13:32.738Z",
                ownerUserId: 1,
            };
            const expectedEntity = {object: 1};

            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('update');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.updateById(1, inputEntity);
            expect(actualEntity).toEqual(expectedEntity);
        });

        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                const inputEntity = 1;
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('update');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.updateById(1, inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });



    describe('create method', () => {
        it('should create a new entity', async () => {

            const inputEntity = {
                title: "Win a million dollars",
                body: 'Test body here',
                priority: 3,
                dueDate: "2017-11-28T16:13:32.738Z",
                ownerUserId: 1,
            };
            const expectedEntity = Object.assign({}, inputEntity, {id: 1});
            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('insert');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.create(inputEntity);
            expect(actualEntity).toEqual(expectedEntity);
            delete actualEntity.id;
            expect(actualEntity).toEqual(inputEntity);
        });
        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {

                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('insert');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.create();
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });


    describe('findByUsername method', () => {
        it('should create a new entity', async () => {

            const inputEntity = 'chuckhagy';
            const expectedEntity = [{id: 1}];
            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('select');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.findByUsername(inputEntity);
            expect(actualEntity).toEqual(expectedEntity);
            delete actualEntity.id;
            expect(actualEntity).toEqual(expectedEntity);
        });
        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {
                const inputEntity = 'chuckhagy';
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('select');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.findByUsername(inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });

    describe('deleteById method', () => {
        it('should create a new entity', async () => {

            const inputEntity = '1';
            const expectedEntity = [{id: 1}];
            knexTracker.on('query', (query, step) => {
                expect(query.method).toBe('del');
                query.response([expectedEntity]);
            });
            const actualEntity = await entityRepository.deleteById(inputEntity);
            expect(actualEntity).toEqual(expectedEntity);
            delete actualEntity.id;
            expect(actualEntity).toEqual(expectedEntity);
        });
        it('handles errors when they arise', async () => {
            let actualEntity;
            let expectedEntity;
            try {
                const inputEntity = 'chuckhagy';
                expectedEntity = new Error('ARBITRARY_ERROR');
                knexTracker.on('query', (query, step) => {
                    expect(query.method).toBe('del');
                    query.reject(expectedEntity);
                });
                actualEntity = await entityRepository.deleteById(inputEntity);
            }
            catch (error) {
                expect(error.message).toEqual(expectedEntity.message);
            }
        });
    });


    afterEach(() => {
        knexTracker.uninstall();
    });

    afterAll(() => {
        KnexMock.unmock(db);
    });


});
