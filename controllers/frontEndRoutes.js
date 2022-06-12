const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../models');

//find all blogs
router.get('/', (req, res) => {
    Blog.findAll({include: [User]}).then(blogs => {
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false;
        res.render('home', {blogs:hbsBlogs, loggedIn, username:req.session.user?.username})
    })
})

//route to redirect user back to dashboard page if not logged in
router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})

//route for users to signup
router.get("/signup",(req,res)=>{
    res.render("signup")
})

//route to redirect user to login page if not logged in and show blog,comment data
router.get("/dashboard",(req,res)=>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    User.findByPk(req.session.user.id, {
        include: [Blog, Comment]
    }).then(userData => {
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        res.render("dashboard", hbsData)
    })
})

//route to find specific blog
router.get("/blogs/:id", (req, res) =>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    Blog.findByPk(req.params.id,{include:[User, {model: Comment, include: [User]}]})
    .then(dbBlog => {
        const hbsBlog = dbBlog.get({plain:true})
        const loggedIn = req.session.user?true:false;
        console.log('==============')
        console.log(hbsBlog)
        if (dbBlog.userId != req.session.user.id) {
            return res.render('comment', {hbsBlog, loggedIn, username:req.session.user?.username})
        }
        res.render("edit", {hbsBlog, loggedIn, username:req.session.user?.username})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occurred", err });
      });
})

router.get("*",(req,res)=>{
    res.redirect("/")
})

module.exports = router;