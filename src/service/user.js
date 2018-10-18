const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

const authenticate = async ({username, password}) => {
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
const getAll = async () => {
    return await User.find().select('-hash');
};
const getById = async(id) => {
    return await User.findById(id).select('-hash');
};
const create = async (userParam) => {
    if(await User.findOne({username:userParam.username})){
        throw 'Username "' +userParam.username + '" is already taken';
    }
    const user = new User(userParam);

    //hash password
    if(userParam.password){
        user.hash = bcrypt.hashSync(userParam.password,10);
    }

    //save user
    await user.save();
};
const update = async (id, userParam) => {
    const user = await User.findById(id);

    //validate
    if(!user) throw  'User not found';
    if(user.username !== userParam.username && await User.findOne({username:userParam.username})){
        throw 'Username "' + userParam.username + '" is already taken';
    }
    //hash password if it was entered
    if(userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    //copy UserParam properties to user
    Object.assign(user, userParam);
    await user.save();
};

const _delete = async (id) => {
    await User.findByIdAndRemove(id);
};

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
