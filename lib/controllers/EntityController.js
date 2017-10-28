const Boom = require('boom');

class EntityController {
    constructor({ entityName, entityService }) {
        this.entityName = entityName;
        this.entityService = entityService;
        this.create = this.create.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    async getAllUsers(req, res, next){
        try {
            const allUsers = await this.entityService.getAllUsers(req.body);
            res.status(200).json(allUsers);
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
}

module.exports = EntityController;