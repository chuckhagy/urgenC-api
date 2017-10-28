const bcrypt = require('bcryptjs');

class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async getAll() {
        try {
            let users = await this.userRepository.getAll();
            users = users.map(user => {
                delete user.hashedPassword
                return user
            })
            return users
        } catch (error) {
            console.log(error);
        }
    }

    async getById(params) {
        const id = params.userId;
        try {
            let user = await this.userRepository.getById(id);
            delete user.hashedPassword
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(params, body) {
        const id = params.userId;
        try {
            let user = await this.userRepository.updateById(id, body);
            delete user.hashedPassword;
            return user
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}

module.exports = UserService;