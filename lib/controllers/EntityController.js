const Boom = require('boom');

class EntityController {
    constructor({entityName, entityService}) {
        this.entityName = entityName;
        this.entityService = entityService;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.getGoalsByAssignment = this.getGoalsByAssignment.bind(this);
        this.getUsersByAssignment = this.getUsersByAssignment.bind(this);
        // this.getByOwnerUserId = this.getByOwnerUserId.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const authenticatedUserId = req.authenticatedUserId;
            const allEntities = await this.entityService.getAll(authenticatedUserId);
            res.status(200).json(allEntities);
        } catch (error) {
            if(error.message === "ADMIN_ONLY") return res.status('403').send('Admin-only Access');
            res.status('405').send('System Error')
        }
    }

    async getById(req, res, next) {
        try {
            const entity = await this.entityService.getById(req.params, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            res.status('405').send('System Error')
        }
    }

    async getGoalsByAssignment(req, res, next) {
        try {
            const entity = await this.entityService.getGoalsByAssignment(req.params, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            res.status('405').send('System Error')
            console.log(error)
        }
    }

    async getUsersByAssignment(req, res, next) {
        try {
            const entity = await this.entityService.getUsersByAssignment(req.params);
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



    // async getByOwnerUserId(req, res, next) {
    //     try {
    //         const entity = await this.entityService.getByOwnerUserId(req.params);
    //         res.status(200).json(entity);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
