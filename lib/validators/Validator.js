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
            if (typeof item.statusMessage !== 'string' || item.statusMessage.trim().length > 1500) return false;
            return {
                profileColor: item.profileColor.trim(),
                displayName: item.displayName.trim(),
                email: item.email.trim(),
                statusMessage: item.statusMessage.trim()
            };

        //for updated goals, returns new object if valid (trimmed, etc.)
        case 'updateGoal':
            if (typeof item.title !== 'string' || item.title.trim().length > 32) return false;
            if (typeof item.body !== 'string' || item.body.trim().length > 1500) return false;
            if (typeof item.dueDate !== 'string' || item.dueDate.trim().length > 64) return false;
            if (isNaN(item.priority) || parseInt(item.priority) < 1 || parseInt(item.priority) > 5) return false;
            return {
                title: item.title.trim(),
                body: item.body.trim(),
                dueDate: item.dueDate.trim(),
                priority: item.priority.trim()
            };


        //for create goals, returns new object if valid (trimmed, etc.)
        case 'createGoal':
            if (typeof item.title !== 'string' || item.title.trim().length > 32) return false;
            if (typeof item.body !== 'string' || item.body.trim().length > 1500) return false;
            if (typeof item.dueDate !== 'string' || item.dueDate.trim().length > 64) return false;
            if (isNaN(item.priority) || parseInt(item.priority) < 1 || parseInt(item.priority) > 5) return false;
            if (isNaN(item.ownerUserId)) return false;

            return {
                title: item.title.trim(),
                body: item.body.trim(),
                dueDate: item.dueDate.trim(),
                priority: item.priority.trim(),
                ownerUserId: item.ownerUserId
            };

        //for create assignments, returns new object if valid (trimmed, etc.)
        case 'createAssignments':
            if (typeof item.username !== 'string' || item.username.trim().length > 32) return false;
            if (typeof item.status !== 'string' || item.status.trim().length > 32) return false;
            if (isNaN(item.goalId)) return false;

            return {
                username: item.username.trim(),
                status: item.status.trim(),
                goalId: item.goalId,
            };


        // username: 'michael'
        // status: 'current' } <>
        // goalId: 14


        default:
            return false
    }
}

module.exports = validate;