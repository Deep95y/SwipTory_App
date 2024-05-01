const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const auth = require('./auth');
const createapi = require('./createapi');
const { router } = require('./useraction');


app.use(express.json()); 
app.use(cors()); 

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/', auth);
app.use('/', createapi);
app.use('/', router);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process if MongoDB connection fails
    });

module.exports = app;
