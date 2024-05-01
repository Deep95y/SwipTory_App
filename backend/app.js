const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5000;

const auth = require('./auth');
const createapi = require('./createapi');
const { router } = require('./useraction');

app.use(express.json()); 
app.use(cors()); 

app.use('/', auth);
app.use('/', createapi);
app.use('/', router);

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('server is up'))
    .catch((error) => console.log(error))
})
