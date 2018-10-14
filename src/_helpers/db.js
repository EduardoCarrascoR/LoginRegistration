const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user')
};