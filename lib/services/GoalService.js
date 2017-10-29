const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalRepository, userRepository}){
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    async getAll(authenticatedUserId) {
        try {
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if(authenticatedUser.username.trim() !== 'chuckhagy') throw new Error('ADMIN_ONLY')
            let goals = await this.goalRepository.getAll();
            return goals
        } catch (error) {
            if(error.message === "ADMIN_ONLY") throw error;
            console.log(error);
        }
    }

    async getByOwnerUserId(params) {
        const id = params.ownerUserId;
        try {
            let goals = await this.goalRepository.getByOwnerUserId(id);
            return goals
        } catch (error) {
            console.log(error);
        }
    }

    async getGoalsByAssignment(params) {
        const id = params.userId;
        try {
            let assignedGoals = await this.goalRepository.getGoalsByAssignment(id);
            console.log(assignedGoals)
            return assignedGoals
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalRepository.updateById(id, body);
            return goal
        } catch (error) {
            console.log(error);
        }
    }

    async create(attributes) {
        try {
            const goal = await this.goalRepository.create(attributes);
            return goal
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalRepository.deleteById(id);
            return goal
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService;