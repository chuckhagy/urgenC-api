const bcrypt = require('bcryptjs');
const validate = require('../validators/Validator')


class UserService {
    constructor({goalRepository, userRepository, goalAssignmentRepository}) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.goalAssignmentRepository = goalAssignmentRepository;

    }

    async getAll(authenticatedUserId) {
        try {
            let isValid = validate(authenticatedUserId, 'integerType');
            if(!isValid) throw new Error('INVALID_INPUTS');
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if (authenticatedUser.role.trim() !== 'admin') throw new Error('ADMIN_ONLY');
            let goals = await this.goalRepository.getAll();
            return goals
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        let isValid = validate(params.goalId, 'integerType');
        if(!isValid) throw new Error('INVALID_INPUTS');

        let attributes = Object.assign({}, body);
        let validAttributes = validate(attributes, 'updateGoal');
        if(!validAttributes) throw new Error('INVALID_INPUTS');
        else attributes = validAttributes;


        const id = parseInt(params.goalId);
        try {
            let goal = await this.goalRepository.getById(id);
            if (goal.ownerUserId !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            goal = await this.goalRepository.updateById(id, attributes);
            return goal
        } catch (error) {
            throw error;

        }
    }

    async create(body, authenticatedUserId) {
        try {
            let attributes = Object.assign({}, body);
            let validAttributes = validate(attributes, 'updateGoal');
            if(!validAttributes) throw new Error('INVALID_INPUTS');
            else attributes = validAttributes;
            attributes.ownerUserId = body.ownerUserId

            if(parseInt(body.ownerUserId) !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            const goal = await this.goalRepository.create(attributes);
            return goal
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteById(params, authenticatedUserId) {

        let isValid = validate(params.goalId, 'integerType');
        if(!isValid) throw new Error('INVALID_INPUTS');

        const id = params.goalId;
        try {
            let goal = await this.goalRepository.getById(id);
            if (goal.ownerUserId !== authenticatedUserId) throw new Error('PERMISSION_DENIED');
            goal = await this.goalRepository.deleteById(id);
            return goal
        } catch (error) {
            throw error;
        }
    }

    async getUsersByAssignment(params, authenticatedUserId) {
        let isValid = validate(authenticatedUserId, 'integerType');
        let isValid2 = validate(params.goalId, 'integerType');
        if (!isValid || !isValid2) throw new Error('INVALID_INPUTS');

        const id = parseInt(params.goalId);
        try {
            let assignedUsers = await this.goalAssignmentRepository.getUsersByAssignment(id);
            assignedUsers = assignedUsers.map(user => {
                delete user.hashedPassword;
                return user
            });
            let checkUserPresent = assignedUsers.find(user => user.userId === authenticatedUserId)
            if (!checkUserPresent) throw new Error('PERMISSION_DENIED');
            return assignedUsers
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;