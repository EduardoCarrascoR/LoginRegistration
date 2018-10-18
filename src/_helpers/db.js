const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString, { useNewUrlParser: true }).then(db => console.log('db is connected'))
    .catch(err => console.log(err));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user')
};