class EntityRepository {
    constructor({entityName, db}) {
        this._entityName = entityName;
        this._db = db;
    }

    async create(attributes) {
        try {
            let user = await this._db(this._entityName).insert(attributes, '*');
            return user;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EntityRepository;