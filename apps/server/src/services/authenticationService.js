const User = require('../models/User');

const signupService = async (username, password) => {
    try {
        let user = await User.find({
            username: username
        })
        if (user.length > 0) {
            throw new Error('User already exists');
        }
        user = new User({
            username: username,
            password: password
        })
        await user.save();
        return user._id;
    } catch (err) {
        throw new Error(err.message);
    }
}

const loginService = async (username, password) => {
    try {
        let user = await User.find({
            username: username
        })
        if (user.length === 0) {
            throw new Error('User does not exist');
        }
        user = user[0];
        if (user.password !== password) {
            throw new Error('Incorrect password');
        }

        return user._id;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findUserByUsernameService = async (username) => {
    try {
        const user = await User.find({
            username: username
        });
        if (!user) {
            throw new Error('User does not exist');
        }
        return user._id;
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    signupService,
    loginService,
    findUserByUsernameService
}