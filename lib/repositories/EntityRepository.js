class EntityRepository {
    constructor({entityName, db}) {
        this._entityName = entityName;
        this._db = db;
    }

    async getAll(attributes) {
        try {
            let allEntities = await this._db(this._entityName);
            return allEntities;
        } catch (error) {
            console.log(error)
        }
    }

    async create(attributes) {
        try {
            let [entity] = await this._db(this._entityName).insert(attributes, '*');
            return entity;
        } catch (error) {
            console.log(error)
        }
    }

    async findByUsername(username) {
        try {
            let [entity] = await this._db(this._entityName).where({ username }, '*');
            return entity;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EntityRepository;