function validate(item, type) {
    switch (type) {
        case 'text32Type':
            return (typeof item === 'string' && item.length > 0 && item.length <= 32);

        case 'integerType':
            return (!isNaN(item));

        case 'textFullType':
            return (typeof item === 'string');

        case 'email':
            return (typeof item === 'string' && /(.+)@(.+){2,}\.(.+){2,}/.test(item));

        //for new users, returns new object if valid (trimmed, etc.)
        case 'newUser':
            if (typeof item.username !== 'string' || item.username.trim().length > 32) return false;
            if (typeof item.displayName !== 'string' || item.displayName.trim().length > 32) return false;
            if (typeof item.email !== 'string' || item.email.trim().length > 60 || !/(.+)@(.+){2,}\.(.+){2,}/.test(item.email)) return false;
            if (typeof item.password !== 'string' || item.username.trim().length > 32) return false;
            return {
                username: item.username.trim(),
                displayName: item.displayName.trim(),
                email: item.email.trim(),
                password: item.password.trim()
            };

        //for updated users, returns new object if valid (trimmed, etc.)
        case 'updateUser':
            if (typeof item.profileColor !== 'string' || item.profileColor.trim().length > 7) return false;
            if (typeof item.displayName !== 'string' || item.displayName.trim().length > 32) return false;
            if (typeof item.email !== 'string' || item.email.trim().length > 60 || !/(.+)@(.+){2,}\.(.+){2,}/.test(item.email)) return false;
            if (typeof item.statusMessage !== 'string' || item.statusMessage.trim().length > 1000) return false;
            return {
                profileColor: item.profileColor.trim(),
                displayName: item.displayName.trim(),
                email: item.email.trim(),
                statusMessage: item.statusMessage.trim()
            };

        default:
            return false
    }
}

module.exports = validate;