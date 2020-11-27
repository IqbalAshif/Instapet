'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rootRoute = require('./routes/rootRoute.js');
const userRoute = require('./routes/userRoute.js');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

<<<<<<< HEAD
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('css'));

app.use("/", rootRoute);



=======
//routes
app.use('/', rootRoute);
app.use('/user', userRoute);
>>>>>>> master

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
