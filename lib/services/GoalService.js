const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalRepository, userRepository}){
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    async getAll(authenticatedUserId) {
        try {
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if(authenticatedUser.role.trim() !== 'admin') throw new Error('ADMIN_ONLY');
            let goals = await this.goalRepository.getAll();
            return goals
        } catch (error) {
            if(error.message === "ADMIN_ONLY") throw error;
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



    // async getByOwnerUserId(params) {
    //     const id = params.ownerUserId;
    //     try {
    //         let goals = await this.goalRepository.getByOwnerUserId(id);
    //         return goals
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
