class EntityRepository {
    constructor({entityName, db}) {
        this._entityName = entityName;
        this._db = db;
    }

    async getAll() {
        try {
            let allEntities = await this._db(this._entityName);
            return allEntities;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            let [entity] = await this._db(this._entityName).where({ id });
            return entity
        } catch (error) {
            console.log(error)
        }
    }

    async getByOwnerUserId(ownerUserId) {
        try {
            let entities = await this._db(this._entityName).where({ ownerUserId });
            return entities
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(id, body) {
        try {
            console.log(body)
            let [entity] = await this._db(this._entityName).update(body, '*').where({ id });
            return entity
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

    async deleteById(id) {
        try {
            let [entity] = await this._db(this._entityName).del('*').where({ id });
            return entity
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EntityRepository;