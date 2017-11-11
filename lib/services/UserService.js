const bcrypt = require('bcryptjs');
const validate = require('../validators/Validator')


class UserService {
    constructor({userRepository, goalAssignmentRepository}){
        this.userRepository = userRepository;
        this.goalAssignmentRepository = goalAssignmentRepository;
    }

    async getAll(authenticatedUserId) {
        try {
            let isValid = validate(authenticatedUserId, 'integerType');
            if(!isValid) throw new Error('INVALID_INPUTS');
            let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            if(authenticatedUser.role.trim() !== 'admin') throw new Error('ADMIN_ONLY');
            let users = await this.userRepository.getAll();
            users = users.map(user => {
                delete user.hashedPassword;
                return user
            });
            return users
        } catch (error) {
            throw error;
        }
    }

    async getById(params, authenticatedUserId) {
        try {
            let isValid = validate(params.userId, 'integerType');
            if(!isValid) throw new Error('INVALID_INPUTS');
            const id = parseInt(params.userId);
            // let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
            // if(authenticatedUserId !== id && authenticatedUser.role.trim() !== 'admin') throw new Error('PERMISSION_DENIED');
            let user = await this.userRepository.getById(id);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        let isValid = validate(params.userId, 'integerType');
        if(!isValid) throw new Error('INVALID_INPUTS');

        let attributes = Object.assign({}, body);
        let validAttributes = validate(attributes, 'updateUser');
        if(!validAttributes) throw new Error('INVALID_INPUTS');
        else attributes = validAttributes;

        const id = parseInt(params.userId);
        try {
            if(id !== authenticatedUserId)throw new Error('PERMISSION_DENIED');
            let user = await this.userRepository.updateById(id, attributes);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error;
        }
    }

    async create(attributes) {
        try {
            attributes = Object.assign({}, attributes);
            let validAttributes = validate(attributes, 'newUser');
            if(!validAttributes) throw new Error('INVALID_INPUTS');
            else attributes = validAttributes;

            const hashedPassword = await bcrypt.hash(attributes.password, 10);
            attributes.hashedPassword = hashedPassword;
            delete attributes.password;
            const user = await this.userRepository.create(attributes);
            delete user.hashedPassword;
            return user
        } catch (error) {
            console.log(error)
            if(error.constraint === 'user_username_unique') throw new Error('DUPLICATE_USERNAME');
            if(error.constraint === 'user_email_unique') throw new Error('DUPLICATE_EMAIL');
            throw error
        }
    }

    async deleteById(params, authenticatedUserId) {
        try {
        let isValid = validate(params.userId, 'integerType');
            if (!isValid) throw new Error('INVALID_INPUTS');
            const id = parseInt(params.userId);
            if(id !== authenticatedUserId)throw new Error('PERMISSION_DENIED');
            let user = await this.userRepository.deleteById(id);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error
        }
    }

    async getGoalsByAssignment(params, authenticatedUserId) {
        try {
            let isValid = validate(authenticatedUserId, 'integerType');
            let isValid2 = validate(params.userId, 'integerType');
            if (!isValid || !isValid2) throw new Error('INVALID_INPUTS');

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
}

module.exports = UserService;