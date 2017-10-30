process.env.NODE_ENV = 'test';
const HttpMock = require('node-mocks-http');
const EntityController = require('./EntityController');
const Boom = require('boom')


describe('EntityController Tests', () => {
    const entityService = {
        getAll: jest.fn(),
        getById: jest.fn(),
        getGoalsByAssignment: jest.fn(),
        getUsersByAssignment: jest.fn(),
        updateById: jest.fn(),
        create: jest.fn(),
        deleteById: jest.fn()
    }

    const entityController = new EntityController({
        entityName: 'Entity',
        entityService
    });

    describe('create method', () => {
        it('should respond with HTTP status code of 201 AND the new entity', async () => {
            const inputEntity = {
                title: 'arbitrarty nonsense',
            }
            const expectedEntity = Object.assign({}, inputEntity, {id: 1});
            const req = HttpMock.createRequest({body: inputEntity});
            const res = HttpMock.createResponse();
            entityService.create.mockReturnValueOnce(Promise.resolve(expectedEntity));

            await entityController.create(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData())

            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('getAll method', () => {
        it('should respond with HTTP status code of 200 AND an array of entities', async () => {

            const expectedEntity = [{objects: 'here'}];
            const req = HttpMock.createRequest();
            const res = HttpMock.createResponse();
            entityService.getAll.mockReturnValueOnce(Promise.resolve(expectedEntity))

            await entityController.getAll(req, res, () => {});

            const actualEntity = JSON.parse(res._getData());


            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('getById method', () => {
        it('should respond with HTTP status code of 200, async and single entity', async () => {
            const inputEntity = 1
            const expectedEntity = [{id: 1}];
            const req = HttpMock.createRequest({query: inputEntity});
            const res = HttpMock.createResponse();
            entityService.getById.mockReturnValueOnce(Promise.resolve(expectedEntity));

            await entityController.getById(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData())

            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('getGoalsByAssignment method', () => {
        it('should respond with HTTP status code of 200 and array of entities', async () => {
            const inputEntity = 1;
            const expectedEntity = [{id: 1}];
            const req = HttpMock.createRequest({query: inputEntity});
            const res = HttpMock.createResponse();
            entityService.getGoalsByAssignment.mockReturnValueOnce(Promise.resolve(expectedEntity));

            await entityController.getGoalsByAssignment(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData())

            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('getUsersByAssignment method', () => {
        it('should respond with HTTP status code of 200 and array of entities', async () => {
            const inputEntity = 1;
            const expectedEntity = [{id: 1}];
            const req = HttpMock.createRequest({query: inputEntity});
            const res = HttpMock.createResponse();
            entityService.getUsersByAssignment.mockReturnValueOnce(Promise.resolve(expectedEntity));

            await entityController.getUsersByAssignment(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData())

            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('updateById method', () => {
        it('should respond with HTTP status code of 200 and the updated entity', async () => {
            const id = 1;
            const inputEntity = {title: 'new title'};
            const expectedEntity = [{id: 1, title: 'new title'}];
            const req = HttpMock.createRequest({query: id, body:inputEntity});
            const res = HttpMock.createResponse();
            entityService.updateById.mockReturnValueOnce(Promise.resolve(expectedEntity));
            await entityController.updateById(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData());

            expect(actualEntity).toEqual(expectedEntity);
        })
    })

    describe('getGoalsByAssignment method', () => {
        it('should respond with HTTP status code of 202 and the deleted entity', async () => {
            const inputEntity = 1;
            const expectedEntity = [{id: 1}];
            const req = HttpMock.createRequest({query: inputEntity});
            const res = HttpMock.createResponse();
            entityService.deleteById.mockReturnValueOnce(Promise.resolve(expectedEntity));

            await entityController.deleteById(req, res, () => {
            });
            const actualEntity = JSON.parse(res._getData())

            expect(actualEntity).toEqual(expectedEntity);
        })
    })





});
