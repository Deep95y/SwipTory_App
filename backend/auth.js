const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();

require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const dataSchema = new mongoose.Schema({
    Username: String, 
    Password: String,
});


 const Users = mongoose.model("Users", dataSchema);

router.get('/getdata', async (req, res) => { 
    try {
        const user = await Users.find({}); 
        res.json(user)
    } catch (error) { 
        res.json({
            message: 'Something went wrong!' 
        })
    }
});

router.post('/createdata', async (req, res) => {
    const { Username, Password } = req.body
    try {
        const user = await Users.create({

            Username,
            Password
        })

        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!' 
        })
    }
});

router.post("/signUp", async (req, res) => { 
    try {
      const {Username, Password} = req.body;
      if (!Username || !Password) {
          return res.status(400).json({
              errorMessage: "Bad request",
          });
      }
      const user = await Users.findOne({ Username });
      if (user) { 
        return res.json({
          status: "User with this Username exist, please login",
        });
      }
      const encryptedPass = await bcrypt.hash(Password, 10);
      await Users.create({
        Username,
        Password: encryptedPass,
       
      });
      res.json({
        status: "SUCCESS",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "FAILED",
        message: "Something went wrong!",
      });
    }
  });
  router.post("/SignIn", async (req, res) => {
    try {
      const { Username, Password } = req.body;
      if (!Username || !Password) {
          return res.status(400).json({
              errorMessage: "Bad Request! Invalid credentials",
          });
      }
      const user = await Users.findOne({ Username }); 
      if (!user) {
        return res.json({
          status: "Please enter valid username",
        });
      }
      const passwordmatch = await bcrypt.compare(Password, user.Password);

      if (!passwordmatch) {
        return res.json({
          status: "Password is incorrect!",
        });
      } 
      const jwToken = jwt.sign(user.toJSON(), process.env.jwToken, {
      expiresIn: 300000, 
      });
       return res.json({ 
       status: "Login successful",
       username: Username,
       jwToken,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "FAILED",
        message: "Something went wrong",
      });
    }
  });

module.exports = router;
