const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
const autenticate = async ({username, password}) => {
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.hash)){
        const {hash, ...userWithoutHash} =user.toObject();
        const token = jwt.sign({sub: user_id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
};
const getAll = async() => {
    return await User.find().select('-hash');
};
const getById = async(id) => {
    return await User.findById(id).select('-hash');
};
//........