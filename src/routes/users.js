const router = require('express-promise-router')();

const {
    authenticate,
    register,
    getAll,
    getCurrent,
    getById,
    update,
    _delete
} = require('../controllers/users');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

