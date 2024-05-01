const express = require("express");
const router = express.Router();

require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserActionSchema = new mongoose.Schema({
  
    RefUserId: {
        type:String,
        required: true
    },
    Likes: {
        type: Array,
        required: true
    },

    Bookmarks: {
        type: Array,
        required: true
    }
});


const user_action = mongoose.model("user_actions", UserActionSchema);


const verifyToken = (req, res, next) => {
    try{
        const HeadetToken = req.headers["authorization"];
        if(!HeadetToken) {
            return res.status(401).json({
                message:"Unauthorized acces"
            });
        }
        const decode = jwt.verify(HeadetToken, process.env.jwToken); 
        req.userId = decode._id; 
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            Status:"Failed",
            message:"Something went wrong"
        })
    }
}

router.post('/updateuserlikes', verifyToken, async(req, res) => {

     const{storyId} = req.body

    try{
        const actions = await user_action.find({  
            RefUserId: req.userId
        }) 

        if(!actions.length) {
            const user = await user_action.create({
                Likes:[storyId],
                Bookmarks:[], 
                RefUserId: req.userId
            }) 
        }
        else{
           const user = await user_action.findOneAndUpdate(
                {  RefUserId: req.userId}, 
                { $push: { Likes: storyId } }
            );
        }

        res.json({
           Status:"Success"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            Message:"Something went wrong"
        });
    }
})

router.post('/updateuserbookmarks', verifyToken, async(req, res) => {
    const{storyId} = req.body

   try{
       const actions = await user_action.find({  
           RefUserId: req.userId
       }) 

       if(!actions.length) {
           const user = await user_action.create({
               Likes:[], 
               Bookmarks:[storyId], 
               RefUserId: req.userId
           }) 
       } 
       else{
          const user = await user_action.findOneAndUpdate(
               {  RefUserId: req.userId}, 
               { $push: { Bookmarks: storyId } }
           );
       }

       res.json({
          Status:"Success"
       })
   }
   catch(error){
       console.log(error);
       res.status(500).json({
           Message:"Something went wrong"
       });
   }
})


router.get('/getuseractions',verifyToken, async(req, res) =>{ 
 
    try{
      const userId = req.userId;
      const {storyId} = req.query;

        const response = await user_action.find({
            RefUserId: userId
        })
        if(!response.length){
           res.json(
            { 
                Like: false,
                Bookmark: false
            }
          )
        }
        else {
            res.json(
                { 
                    Like: response[0].Likes.includes(storyId),
                    Bookmark:  response[0].Bookmarks.includes(storyId)
                }
              )
        }

    }
    catch(error){
        console.log(error);
    }
})

router.post('/removeuserlikes', verifyToken, async(req, res) => {
  
    try{
        const{storyId} = req.body;
        const userId = req.userId;
        
        const response = await user_action.updateOne({ RefUserId: userId}, {
            $pullAll: {
                Likes: [storyId],  
            },
        });
        res.json({
            Status:'Success'
        })

    }
    catch(error){
        console.log(error);
    
    }
}) 


router.post('/removeuserbookmarks', verifyToken, async(req, res) => {
  
    try{
        const{storyId} = req.body;
        const userId = req.userId;
        
        const response = await user_action.updateOne({ RefUserId: userId}, {
            $pullAll: {
                Bookmarks: [storyId],  
            },
        });
        res.json({
            Status:'Success'
        })

    }
    catch(error){
        console.log(error);
    
    }
}) 

module.exports = {
    router,
    user_action
}