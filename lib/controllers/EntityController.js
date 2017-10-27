const Boom = require('boom');

class EntityController {


    async create(req, res, next){
        try{
            let newUser = await this._entityService.create(request.body, {

            })
        }
        catch{

        }
    }

}

module.exports = EntityController;