const Boom = require('boom');

class EntityController {
    constructor({authenticationService}) {
        this.authenticationService = authenticationService;
        this.token = this.token.bind(this);
    }

    async token(req, res, next) {
        try {
            const token = await this.authenticationService.authenticate(req.body);
            res.status(200).json({token})
        } catch (error) {
            throw error
        }
    }


}

module.exports = EntityController;