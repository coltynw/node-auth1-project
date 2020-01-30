const express = require('express');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConnection = require('../data/dbConfig');

const usersRouter = require('../users/usersRouter');


const server = express();

const sessionConfig = {
    name: 'monkey',
        secret:'keep it secret, keep it safe!',
        cookie: {
            maxAge: 1000 * 30,
            secure: false, 
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: false, 
        // don't forget 'new'
        store: new KnexSessionStore({ 
            knex: dbConnection,
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 60000
        })
}
server.use(session(sessionConfig));



server.use(express.json());
server.use('/api', usersRouter)


module.exports = server