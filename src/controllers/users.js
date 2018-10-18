const userS = require('../service/user');

module.exports = {
    authenticate: (req, res, next) => {
        userS.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
            .catch(err => next(err));
    },
    register: (req, res, next) => {
        userS.create(req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    },
    getAll: (req, res, next) => {
        userS.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    },
    getCurrent: (req, res, next) => {
        userS.getById(req.param.sub)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    },
    getById: (req, res, next) => {
        userS.getById(req.param.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    },
    update: (req, res, next) => {
        userS.update(req.param.id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    },
    _delete: (req, res, next) => {
        userS.delete(req.param.id)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
};
