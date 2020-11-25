'use strict';
const bodyParser = require('body-parser');
const rootRoute = require("./routes/rootRoute");
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('css'));

app.use("/", rootRoute);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));