const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalRepository, userRepository}) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    async getAll(authenticatedUserId) {
        try {
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if (authenticatedUser.role.trim() !== 'admin') throw new Error('ADMIN_ONLY');
            let goals = await this.goalRepository.getAll();
            return goals
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        const id = parseInt(params.goalId);
        try {
            let goal = await this.goalRepository.getById(id);
            if (goal.ownerUserId !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            goal = await this.goalRepository.updateById(id, body);
            return goal
        } catch (error) {
            throw error;

        }
    }

    async create(attributes, authenticatedUserId) {
        try {
            if(parseInt(attributes.ownerUserId) !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            const goal = await this.goalRepository.create(attributes);
            return goal
        } catch (error) {
            throw error;
        }
    }

    async deleteById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalRepository.deleteById(id);
            return goal
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;