const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalRepository}){
        this.goalRepository = goalRepository;
    }

    async getAll() {
        try {
            let goals = await this.goalRepository.getAll();
            return goals
        } catch (error) {
            console.log(error);
        }
    }
    //
    // async getById(params) {
    //     const id = params.userId;
    //     try {
    //         let user = await this.userRepository.getById(id);
    //         delete user.hashedPassword
    //         return user
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //
    // async updateById(params, body) {
    //     const id = params.userId;
    //     try {
    //         let user = await this.userRepository.updateById(id, body);
    //         delete user.hashedPassword;
    //         return user
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async create(attributes) {
        try {
            const goal = await this.goalRepository.create(attributes);
            return goal
        } catch (error) {
            console.log(error);
        }
    }
    //
    // async deleteById(params, body) {
    //     const id = params.userId;
    //     try {
    //         let user = await this.userRepository.deleteById(id, body);
    //         delete user.hashedPassword;
    //         return user
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

module.exports = UserService;