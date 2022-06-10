const express = require('express');
const router = express.Router();
const {User,Blog,Comment} = require('../models');
const helpers = require('../util/helper')

//find all blogs
router.get("/",(req,res)=>{
    Blog.findAll().then(blogs=>{
        console.log(blogs)
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get('/post/:id', (req,res) => {
    Blog.findByPk(req.params.id).then(blog => {
        console.log(blog)
        const hbsBlog = blog.get({plain:true})
        console.log("==========")
        console.log(hbsBlog)
        Comment.findAll({
            where: {
              blog_id: hbsBlog.id
            }
          }).then(comments => {
            const hbsComments = comments.map(comment=>{
                let hbsComment = comment.get({plain:true})
                return {
                    body: hbsComment.body,
                    date: helpers.format_date(hbsComment.date)
                }
            })
            res.render("blog",{
                title:hbsBlog.title,
                body:hbsBlog.body,
                loggedIn: !!req.session.user,
                username:req.session.user?.username,
                comments:hbsComments
            })
          });
    })
})


router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})

router.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        console.log(userData);
        const hbsData = userData.get({plain:true})
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("dashboard",hbsData)
    })
})

router.get('/post/:id/edit', (req,res) => {
    Blog.findByPk(req.params.id).then(blog => {
        console.log(blog)
        const hbsBlog = blog.get({plain:true})
        console.log("==========")
        console.log(hbsBlog)
        
        res.render("edit",{
            title:hbsBlog.title,
            body:hbsBlog.body,
            loggedIn: !!req.session.user,
            username:req.session.user?.username,
            id: req.params.id
        })
    })
})

module.exports = router;