const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

router.post('/add', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newUser = new User({
        firstName,
        lastName,
        email
    });

    newUser.save()
        .then(() => res.json('New user added!'))
        .catch(err => res.json('Error: ' + err));
});

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.json('Error: ' + err));
});

module.exports = router;