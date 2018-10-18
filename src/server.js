require('rootpath')();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyP = require('body-parser');

const jwt = require('./_helpers/jwt');
const eH = require('./_helpers/error-handler');
const user = require('./routes/users');
//setting
app.set('port', process.env.PORT || 3000);
//middleware
app.use(bodyP.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(bodyP.json());

//jwt auth to secure api
app.use(jwt());

//api routes
app.use('/users', user);
//global handler
app.use(eH);
//connect server
app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});