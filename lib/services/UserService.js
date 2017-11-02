const bcrypt = require('bcryptjs');

class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async getAll(authenticatedUserId) {
        try {
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
        const id = parseInt(params.userId);
        let authenticatedUser = await this.userRepository.getById(authenticatedUserId);
        if(authenticatedUserId !== id && authenticatedUser.role.trim() !== 'admin') throw new Error('PERMISSION_DENIED');
        try {
            let user = await this.userRepository.getById(id);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error;
        }
    }

    async updateById(params, body, authenticatedUserId) {
        const id = parseInt(params.userId);
        try {
            if(id !== authenticatedUserId)throw new Error('PERMISSION_DENIED');
            let user = await this.userRepository.updateById(id, body);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error;
        }
    }

    async create(attributes) {
        try {
            attributes = Object.assign({}, attributes);
            const hashedPassword = await bcrypt.hash(attributes.password, 10);
            attributes.hashedPassword = hashedPassword;
            delete attributes.password;
            const user = await this.userRepository.create(attributes);
            delete user.hashedPassword;
            return user
        } catch (error) {
            if(error.constraint === 'user_username_unique') throw new Error('DUPLICATE_USERNAME');
            if(error.constraint === 'user_email_unique') throw new Error('DUPLICATE_EMAIL');
            throw error
        }
    }

    async deleteById(params, authenticatedUserId) {
        const id = parseInt(params.userId);
        try {
            if(id !== authenticatedUserId)throw new Error('PERMISSION_DENIED');
            let user = await this.userRepository.deleteById(id);
            delete user.hashedPassword;
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService;