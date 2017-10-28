const Boom = require('boom');

class EntityController {
    constructor({entityName, entityService}) {
        this.entityName = entityName;
        this.entityService = entityService;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByOwnerUserId = this.getByOwnerUserId.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.getGoalsByAssignment = this.getGoalsByAssignment.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const allUsers = await this.entityService.getAll(req.body);
            res.status(200).json(allUsers);
        } catch (error) {
            console.log(error)
        }
    }

    async getById(req, res, next) {
        try {
            const entity = await this.entityService.getById(req.params);
            res.status(200).json(entity);
        } catch (error) {
            console.log(error)
        }
    }

    async getByOwnerUserId(req, res, next) {
        try {
            const entity = await this.entityService.getByOwnerUserId(req.params);
            res.status(200).json(entity);
        } catch (error) {
            console.log(error)
        }
    }

    async getGoalsByAssignment(req, res, next) {
        try {
            const entity = await this.entityService.getGoalsByAssignment(req.params);
            res.status(200).json(entity);
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(req, res, next) {
        try {
            const entity = await this.entityService.updateById(req.params, req.body);
            res.status(200).json(entity);
        } catch (error) {
            console.log(error)
        }
    }

    async create(req, res, next) {
        try {
            const newEntity = await this.entityService.create(req.body);
            res.status(201).json(newEntity);
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(req, res, next) {
        try {
            const newEntity = await this.entityService.deleteById(req.params);
            res.status(202).json(newEntity);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EntityController;