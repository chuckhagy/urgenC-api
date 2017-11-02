const bcrypt = require('bcryptjs');

class UserService {
    constructor({goalAssignmentRepository, userRepository, goalRepository}) {
        this.goalAssignmentRepository = goalAssignmentRepository;
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
    }

    async getGoalsByAssignment(params, authenticatedUserId) {
        try {
            let userId = parseInt(params.userId);
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if (authenticatedUserId !== userId && authenticatedUser.role.trim() !== 'admin') throw new Error('PERMISSION_DENIED');
            let assignedGoals = await this.goalAssignmentRepository.getGoalsByAssignment(userId);


            let assignedGoalsWithUsers = await assignedGoals.map(async (thisGoal) => {
                let theseUserAssignments = await this.goalAssignmentRepository.getUsersByAssignment(thisGoal.goalId);
                theseUserAssignments = theseUserAssignments.map(user => {
                    delete user.hashedPassword;
                    delete user.updated_at;
                    delete user.created_at;
                    return Object.assign({}, user)
                });
                thisGoal.userAssignments = theseUserAssignments;
                return thisGoal
            });
            return Promise.all(assignedGoalsWithUsers)
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
            if (!checkUserPresent) throw new Error('PERMISSION_DENIED');
            return assignedUsers
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        const id = params.assignmentId;
        try {
            let thisAssignment = await this.goalAssignmentRepository.getById(id);
            let thisGoal = await this.goalRepository.getById(thisAssignment.goalId);
            if (parseInt(thisGoal.ownerUserId) !== authenticatedUserId && parseInt(thisAssignment.userId) !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            let goal = await this.goalAssignmentRepository.updateById(id, body);
            return goal
        } catch (error) {
            throw error;
        }
    }

    async create(attributes, authenticatedUserId) {
        try {
            let thisGoal = await this.goalRepository.getById(attributes.goalId);
            if (authenticatedUserId !== thisGoal.ownerUserId) throw new Error('PERMISSION_DENIED');
            let existingAssignments = await this.goalAssignmentRepository.getGoalsByAssignment(attributes.userId);
            let matchingAssignment = existingAssignments.find(assignment => assignment.goalId === parseInt(attributes.goalId));
            if (matchingAssignment) {
                if (matchingAssignment.id) throw new Error('ASSIGNMENT_ALREADY_EXISTS');
            }
            const goal = await this.goalAssignmentRepository.create(attributes);
            return goal
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteById(params, authenticatedUserId) {
        const id = params.assignmentId;
        try {

            let thisAssignment = await this.goalAssignmentRepository.getById(id);
            let thisGoal = await this.goalRepository.getById(thisAssignment.goalId);
            if (parseInt(thisGoal.ownerUserId) !== authenticatedUserId && parseInt(thisAssignment.userId) !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            let deletedAssignment = await this.goalAssignmentRepository.deleteById(id);
            return deletedAssignment
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
