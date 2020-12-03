'use strict';
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./utils/pass.js');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js');
const authRoute = require ('./routes/authRoute.js');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));




//routes
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.use('/pet', passport.authenticate('jwt', {session: false}), petRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
