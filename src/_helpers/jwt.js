const EJwt = require('express-jwt');
const config = require('../config');
const userS = require('../service/user');

const jwt = () => {
    const secret = config.secret;
    return EJwt({secret, isRevoked}).unless({
        path:[
            //public route that don´t require authentication
            '/users/authenticate',
            'users/register'
        ]
    });
};
const isRevoke = async (req, payload, done) => {
    const user = await userS.getById(payload.sub);
    //revoke token if  user no longer exists
    if(!user){
        return done(null, true);
    }
    done();
};
module.exports = jwt;