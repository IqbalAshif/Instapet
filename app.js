'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass.js');
const rootRoute = require('./routes/rootRoute');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js');
const authRoute = require ('./routes/authRoute.js');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');



app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/thumbnails', express.static('thumbnails'));



//routes
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/', rootRoute);
app.use('/pet', petRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

