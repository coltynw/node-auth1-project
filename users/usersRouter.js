const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../auth/auth-middleware.js');

const userThing = require('./users-model.js');

router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash
     userThing.add(creds)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

     userThing.findBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({message: 'error'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })

})

router.get('/users', auth, (req, res) => {
     userThing.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'error returning users'})
    })
})

module.exports = router 