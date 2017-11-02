class EntityRepository {
    constructor({entityName, db}) {
        this._entityName = entityName;
        this._db = db;
        this.getById = this.getById.bind(this)
    }

    async getAll() {
        try {
            let allEntities = await this._db(this._entityName);
            return allEntities;
        } catch (error) {
            throw error
        }
    }

    async getById(id) {
        try {
            let [entity] = await this._db(this._entityName).where({id});
            return entity
        } catch (error) {
            throw error
        }
    }


    async getGoalsByAssignment(userId) {
        try {
            let assignedGoals = await this._db('Goal')
                .join('GoalAssignment', 'GoalAssignment.goalId', '=', 'Goal.id')
                .where({userId});
            return assignedGoals
        } catch (error) {
            throw error
        }
    }


    async getUsersByAssignment(goalId) {
        try {
            let assignedGoals = await this._db('User')
                .join('GoalAssignment', 'User.id', '=', 'GoalAssignment.userId')
                .where({goalId});
            return assignedGoals
        } catch (error) {
            throw error
        }
    }


    async updateById(id, body) {
        try {
            let [entity] = await this._db(this._entityName).update(body, '*').where({id});
            return entity
        } catch (error) {
            throw error
        }
    }

    async create(attributes) {
        try {
            let [entity] = await this._db(this._entityName).insert(attributes, '*');
            return entity;
        } catch (error) {
            throw error
        }
    }

    async findByUsername(username) {
        try {
            let [entity] = await this._db(this._entityName).where({username}, '*');
            return entity;
        } catch (error) {
            throw error
        }
    }

    async deleteById(id) {
        try {
            let [entity] = await this._db(this._entityName).del('*').where({id});
            return entity
        } catch (error) {
            throw error
        }
    }
}

module.exports = EntityRepository;