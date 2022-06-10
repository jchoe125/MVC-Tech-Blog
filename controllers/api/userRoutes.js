const express = require("express");
const router = express.Router();
const {User,Blog,Comment} = require("../../models");
const bcrypt  = require("bcrypt");

//find all users
router.get("/", (req, res) => {
  User.findAll({
    include:[Blog, Comment]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/")
})

//find specific user
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{include: [Blog, Comment]})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//create user
router.post("/", (req, res) => {
  User.create(req.body, {individualHooks: true})
    .then(newUser => {
      req.session.user = {
        id:newUser.id,
        username:newUser.username
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});
router.post("/login", (req, res) => {
  User.findOne({
    where:{
    username:req.body.username
  }
}).then(foundUser=>{
    if(!foundUser){
      return res.status(400).json({msg:"Error - wrong login credentials"})
    }
    if(bcrypt.compareSync(req.body.password,foundUser.password)){
      req.session.user = {
        id:foundUser.id,
        username:foundUser.username
      }
      return res.json(foundUser)
    } else {
      return res.status(400).json({msg:"wrong login credentials"})
    }
  }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    });
});

//update user
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});

//delete user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(delUser => {
    res.json(delUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});


module.exports = router;