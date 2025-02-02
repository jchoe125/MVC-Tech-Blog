const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");

//find all comments
router.get("/", (req, res) => {
    Comment.findAll({include:[User, Blog]})
      .then(dbComments => {
        res.json(dbComments);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occurred", err });
      });
  });

//find specific comment
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{include:[User, Blog]})
      .then(dbComment => {
        res.json(dbComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occurred", err });
      });
});

//create new comment
router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Please login first!"})
  }
    Comment.create({
      body:req.body.body,
      userId:req.session.user.id,
      blogId:req.body.blogId
    })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occurred", err });
      });
});

//update comment
router.put("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
      // TODO: Ensure user updating is original author
    Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedComment => {
      res.json(updatedComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//delete comment
router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(delComment => {
      res.json(delComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});
  
module.exports = router;