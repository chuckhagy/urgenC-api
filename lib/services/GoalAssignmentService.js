const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalAssignmentRepository, userRepository, goalRepository}){
        this.goalAssignmentRepository = goalAssignmentRepository;
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
    }

    async getGoalsByAssignment(params, authenticatedUserId) {
        try {
            let userId = parseInt(params.userId);
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if(authenticatedUserId !== userId && authenticatedUser.role.trim() !== 'admin') throw new Error('PERMISSION_DENIED');
            let assignedGoals = await this.goalAssignmentRepository.getGoalsByAssignment(userId, authenticatedUserId);
            return assignedGoals
        } catch (error) {
            throw error;
        }
    }


    async getUsersByAssignment(params, authenticatedUserId) {
        const id = parseInt(params.goalId);
        try {
            let assignedUsers = await this.goalAssignmentRepository.getUsersByAssignment(id);
            assignedUsers = assignedUsers.map(user => {
                delete user.hashedPassword;
                return user
            });
            let checkUserPresent = assignedUsers.find(user => user.id === authenticatedUserId)
            if(!checkUserPresent) throw new Error('PERMISSION_DENIED');
            return assignedUsers
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        const id = params.goalId;
        try {
            let thisGoal = await this.goalRepository.getById(id);
            if(thisGoal.ownerUserId !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            let goal = await this.goalAssignmentRepository.updateById(id, body);
            return goal
        } catch (error) {
            throw error;
        }
    }

    async create(attributes, authenticatedUserId) {
        try {
            let thisGoal = await this.goalRepository.getById(attributes.goalId);
            if(authenticatedUserId !== thisGoal.ownerUserId) throw new Error('PERMISSION_DENIED')
            const goal = await this.goalAssignmentRepository.create(attributes);
            return goal
        } catch (error) {
            throw error;
        }
    }

    async deleteById(params, body) {
        const id = params.goalId;
        try {
            let goal = await this.goalAssignmentRepository.deleteById(id);
            return goal
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
