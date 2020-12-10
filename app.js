'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass.js');
const rootRoute = require('./routes/rootRoute.js');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js')
const authRoute = require ('./routes/authRoute.js')
const likeRoute = require ('./routes/likeRoute.js')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use(express.static('public'));
app.use('/thumbnails', express.static('thumbnails'));

//routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/pet', passport.authenticate('jwt', {session: false}), petRoute);
app.use('/like', passport.authenticate('jwt', {session: false}), likeRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
