const express = require("express");
const router = express.Router();
const {User,Blog} = require("../../models");
const withAuth = require('../../util/auth')


//find all blogs
router.get("/", (req, res) => {
  Blog.findAll({include:[User, Comment]})
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//find one specific blog
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id,{})
    .then(dbBlog => {
      res.json(dbBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//create new blog
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Error - please log in"})
}
  Blog.create({
    title:req.body.title,
    body:req.body.body,
    UserId:req.session.user.id
  })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//update blog
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
  Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//delete a blog
router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Error - please log in"})
  }
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(delBlog => {
    res.json(delBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});

module.exports = router;