const Boom = require('boom');

class EntityController {
    constructor({ entityName, entityService }) {
        this.entityName = entityName;
        this.entityService = entityService;
        this.create = this.create.bind(this);
    }

    async create(request, response, next) {
        try {
            const newEntity = await this.entityService.create(request.body, {
                userId: request.authenticatedUserId
            });
            response.status(201).json(newEntity);
        } catch (error) {
            next(this._convertError(error));
        }
    }
}

module.exports = EntityController;