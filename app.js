'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rootRoute = require('./routes/rootRoute.js');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', rootRoute);
app.use('/user', userRoute);
app.use('/pet', petRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
