const User = require('../models/User');

const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader || authHeader === '' || authHeader === undefined) {
        return res.status(401).send('Unauthorized');
    }
    const token = authHeader.split(' ')[1];

    if (!token || token === '' || token === 'undefined' || token === undefined) {
        return res.status(401).send('Unauthorized');
    }

    const user = await User.findOne({ _id: token });

    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    req.user = user.username;
    next();
}

module.exports = {
    authorize
}