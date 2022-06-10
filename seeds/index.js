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
        body:"Welcome to my first blog post",
        UserId:1
    },
    {
        title:"my final blog",
        body:"Welcome to my final blog",
        UserId:1
    },
    {
        title:"Cats: a review",
        body:"I love cats I love every kind of cat.  I want to hug all them but you cant. Cant hug every cat......Cant hug every cat. ",
        UserId:2
    }
]

const comments = [
    {
        body: "I really like this blog entry",
        user_id: 1,
        blog_id: 2
    },
    {
        body: "This blog entry is too deep for me",
        user_id: 2,
        blog_id: 3
        
    },
    {
        body: "I disagree with this blog entry",
        user_id: 2,
        blog_id: 1
    },
    {
        body: "Dude, you too? I feel this blog entry in my soul",
        user_id: 3,
        blog_id: 2
    }
]

const feedMe = async () => {
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