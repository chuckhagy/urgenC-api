const bcrypt = require('bcryptjs');

class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async create(attributes, authentication) {
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