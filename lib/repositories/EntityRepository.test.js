process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const EntityRepository = require('./EntityRepository');

describe('Test suit for entityRepository', () => {
    const db = knex({client: 'pg'});
    let entityRepository = null;
    let knexTracker = null;

    KnexMock.mock(db);
    entityRepository = new EntityRepository({
        entityName: 'Entity',
        db
    });

    describe('create method', () => {
        it('should create a new entity (goal in test)', async () => {
            knexTracker = KnexMock.getTracker();
            knexTracker.install();
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

            knexTracker.uninstall();
        });
    });

    afterAll(() => {
        KnexMock.unmock(db);
    });

});
