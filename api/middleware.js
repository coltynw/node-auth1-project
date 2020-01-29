const userThing = require('../hub/users-model.js');
const bcrypt = require('bcryptjs');

function restricted(req, res, next) {
    const {username, password} = req.headers;
    if(username && password){
        userThing.findBy({username})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                next();
            } else {
                res.status(401).json({message: 'error'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error'})
        })
    } else {
        res.status(400).json({message: 'error'})
    }
}

module.exports = restricted 