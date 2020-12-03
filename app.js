'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass.js');
const session = require('express-session');
const rootRoute = require('./routes/rootRoute.js');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js')
const authRoute = require ('./routes/authRoute.js')
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));



//routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/pet', passport.authenticate('jwt', {session: false}), petRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
