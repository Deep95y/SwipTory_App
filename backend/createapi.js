const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var {user_action} = require("./useraction");

const dataSchema = new mongoose.Schema({
  RefUserId: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Likes: {
    type: Number,
    required: true,
  },

  Slides: [
    {
      Heading: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
      Image: {
        type: String,
        required: true,
      },
    },
  ],
});

const verifyToken = (req, res, next) => {
  try {
    const HeadetToken = req.headers["authorization"];
    if (!HeadetToken) {
      return res.status(401).json({
        message: "Unauthorized acces",
      });
    }
    const decode = jwt.verify(HeadetToken, process.env.jwToken);
    req.userId = decode._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Status: "Failed",
      message: "Something went wrong",
    });
  }
};

const data = mongoose.model("data", dataSchema);

router.get("/getData", async (req, res) => {
  try {
    const GetData = await data.find({});
    res.json(GetData);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

router.post("/createApi", verifyToken, async (req, res) => {
  const { Category, SlideData } = req.body;

  try {
    const create = await data.create({
      RefUserId: req.userId,
      Category: Category,
      Slides: SlideData,
      Likes: 0,
    });
    res.json({
      Status: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Status: "Failed",
      message: "Something went wrong",
    });
  }
});

router.get("/getByCategory", async (req, res) => {
  try {
    const category = req.query.Category;
    const user = await data.find({ Category: category });
    res.json(user);
  } catch (error) {
    res.json({
      message: "Something went wrong!",
    });
  }
});

router.get("/getAllByUserId", verifyToken, async (req, res) => {
  try {
    const user = await data.find({ RefUserId: req.userId });
    res.json(user);
  } catch (error) {
    res.json({
      message: "Something went wrong!",
    });
  }
});

router.get("/getAllStories", async (req, res) => {
  try {
    const user = await data.aggregate([
      {
        $group: {
          _id: "$Category",
          items: { $push: "$$ROOT" },
        },
      },
    ]);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong!",
    });
  }
});

router.patch("/updateStoryById", async (req, res) => {
  const { storyId, Category, Slides } = req.body;
  try {
    const users = await data.findByIdAndUpdate(storyId, {
      Category,
      Slides,
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong!",
    });
  }
});

router.post("/updatelike", async (req, res) => {
  const { id, status } = req.body;
  try {
    let likes;
    if (status == "like") {
      likes = await data.findByIdAndUpdate(id, { $inc: { Likes: 1 } });
    } else {
      likes = await data.findByIdAndUpdate(id, { $inc: { Likes: -1 } });
    }

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

router.post("/updateBookmark", async (req, res) => {
  const { id, status } = req.body;
  try {
    let marked;
    if (status == "setmarked") {
      marked = await data.findByIdAndUpdate(id, { $inc: { Bookmark: -1 } });
    } else {
      marked = await data.findByIdAndUpdate(id, { $inc: { Bookmark: -1 } });
    }

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

router.get("/getAllbookmarks", verifyToken, async (req, res) => {
  try {
    const user = await user_action.find({ RefUserId: req.userId });

    let bookmark_array = user[0].Bookmarks;
    const documents = await data.find({
      _id: { $in: bookmark_array },
    });
    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong!",
    });
  }
});

module.exports = router;
