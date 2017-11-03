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
    }

    async getAll(req, res, next) {
        try {
            const authenticatedUserId = req.authenticatedUserId;
            const allEntities = await this.entityService.getAll(authenticatedUserId);
            res.status(200).json(allEntities);
        } catch (error) {
            if(error.message === "ADMIN_ONLY") return res.status('403').send('Admin-only Access');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')
        }
    }

    async getById(req, res, next) {
        try {
            const entity = await this.entityService.getById(req.params, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')
        }
    }

    async getGoalsByAssignment(req, res, next) {
        try {
            const entity = await this.entityService.getGoalsByAssignment(req.params, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')
        }
    }

    async getUsersByAssignment(req, res, next) {
        try {
            const entity = await this.entityService.getUsersByAssignment(req.params, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')        }
    }

    async updateById(req, res, next) {
        try {
            const entity = await this.entityService.updateById(req.params, req.body, req.authenticatedUserId);
            res.status(200).json(entity);
        } catch (error) {
            console.log(error)
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')          }
    }

    async create(req, res, next) {
        try {
            const newEntity = await this.entityService.create(req.body, req.authenticatedUserId);
            res.status(201).json(newEntity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "ASSIGNMENT_ALREADY_EXISTS") return res.status('409').json('This Assignment' +
                ' Already Exists');
            if(error.message === "DUPLICATE_USERNAME") return res.status('409').send('This username is in use');
            if(error.message === "DUPLICATE_EMAIL") return res.status('409').send('This email is in use');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')
        }
    }

    async deleteById(req, res, next) {
        try {
            const newEntity = await this.entityService.deleteById(req.params, req.authenticatedUserId);
            res.status(202).json(newEntity);
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") return res.status('403').send('Permission Denied');
            if(error.message === "INVALID_INPUTS") return res.status('400').send('Invalid-Inputs');
            res.status('500').send('System Error')        }
    }
}

module.exports = EntityController;
