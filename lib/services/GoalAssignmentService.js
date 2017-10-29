const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalAssignmentRepository, userRepository}){
        this.goalAssignmentRepository = goalAssignmentRepository;
        this.userRepository = userRepository;
    }

    async getGoalsByAssignment(params, authenticatedUserId) {
        try {
            let userId = parseInt(params.userId);
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if(authenticatedUserId !== userId && authenticatedUser.role.trim() !== 'admin') throw new Error('PERMISSION_DENIED');
            let assignedGoals = await this.goalAssignmentRepository.getGoalsByAssignment(userId, authenticatedUserId);
            return assignedGoals
        } catch (error) {
            if(error.message === "PERMISSION_DENIED") throw error;
        }
    }


    async getUsersByAssignment(params) {
        const id = parseInt(params.goalId);
        try {
            let assignedUsers = await this.goalAssignmentRepository.getUsersByAssignment(id);
            assignedUsers = assignedUsers.map(user => {
                delete user.hashedPassword;
                return user
            });
            return assignedUsers
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalAssignmentRepository.updateById(id, body);
            return goal
        } catch (error) {
            console.log(error);
        }
    }

    async create(attributes) {
        try {
            const goal = await this.goalAssignmentRepository.create(attributes);
            return goal
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalAssignmentRepository.deleteById(id);
            return goal
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService;
