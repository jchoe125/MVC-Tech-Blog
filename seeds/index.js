const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username:"joe",
        password:"password"
    },
    {
        username:"otherjoe",
        password:"password1"
    },
    {
        username:"therealjoe",
        password:"Password1"
    }
]

const blogs = [
    {
        title:"my first blog",
        content:"Welcome to my first blog post",
        UserId: 1
    },
    {
        title:"my final blog",
        content:"Welcome to my final blog",
        UserId: 1
    },
    {
        title:"Cats: a review",
        content:"I love cats I love every kind of cat.  I want to hug all them but you cant. Cant hug every cat......Cant hug every cat. ",
        UserId: 2
    },
    {
        title: "Jon is the goat",
        content: "Fr",
        userId: 3
    },
]

const comments = [
    {
        body: "I really like this blog entry",
        blog_Id: 2,
        user_Id: 1
    },
    {
        body: "This blog entry is too deep for me",
        blog_Id: 2,
        user_Id: 3
    },
    {
        body: "I disagree with this blog entry",
        blog_Id: 2,
        user_Id: 1
    },
    {
        body: "Dude, you too? I feel this blog entry in my soul",
        blog_Id: 3,
        user_Id: 2
    }
]

const feedMe = async ()=>{
    try {
      await sequelize.sync({ force: true });
      await User.bulkCreate(users, {
        individualHooks: true,
      });
      await Blog.bulkCreate(blogs);
      await Comment.bulkCreate(comments);
  
      process.exit(0);
    } catch (err) {
      console.log(err);
    }
  };
  
  feedMe();