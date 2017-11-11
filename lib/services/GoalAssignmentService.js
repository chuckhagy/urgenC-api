const validate = require('../validators/Validator')


class UserService {
    constructor({goalAssignmentRepository, userRepository, goalRepository}) {
        this.goalAssignmentRepository = goalAssignmentRepository;
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
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

    async create(body, authenticatedUserId) {
        try {
            let attributes = Object.assign({}, body);
            let validAttributes = validate(attributes, 'createAssignments');
            if(!validAttributes) throw new Error('INVALID_INPUTS');
            else attributes = validAttributes;

            let thisGoal = await this.goalRepository.getById(attributes.goalId);
            if (authenticatedUserId !== thisGoal.ownerUserId) throw new Error('PERMISSION_DENIED');
            let users = await this.userRepository.getAll();
            let userId = users.find(user => user.username.trim() === attributes.username).id;

            let existingAssignments = await this.goalAssignmentRepository.getGoalsByAssignment(userId);
            let matchingAssignment = existingAssignments.find(assignment => assignment.goalId === parseInt(attributes.goalId));
            if (matchingAssignment) {
                if (matchingAssignment.id) throw new Error('ASSIGNMENT_ALREADY_EXISTS');
            }

            let realAttributes = {
                goalId: attributes.goalId,
                status: attributes.status,
                userId: userId
            }

            const goal = await this.goalAssignmentRepository.create(realAttributes);
            return goal
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteById(params, authenticatedUserId) {
        try {
            let isValid = validate(authenticatedUserId, 'integerType');
            let isValid2 = validate(params.assignmentId, 'integerType');
            if(!isValid || !isValid2) throw new Error('INVALID_INPUTS');

            const id = params.assignmentId;
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
