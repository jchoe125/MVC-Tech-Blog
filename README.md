# MVC Tech Blog

## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Description
This is a basic CMS-style blog site that was created using the MVC (Model, View, Controller) paradigm, where developers can publish their blog posts and comment on other developers' posts as well. In addition to following the MVC paradigm in its architectural structure, this application uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. Instructions to learn how to run this server locally  can be found in the [Installation](#installation) section.

## Installation
1.  Navigate to the [GitHub repository]() in your web browser and clone the repo.

2.  Prior to running the application, the user must have Node.js installed

3.  Type `npm i` in the terminal in order to install the package dependencies.

4.  Check your newly downloaded “node_modules” folder to ensure that the correct packages have been installed.  The dependencies that are not included within the general Node module package are "bcrypt", "connect-session-sequelize", "dotenv", "express", "express-handlebars", "express-session","mysql2", "sequelize".

5.  Run the application by typing `npm start` in the terminal

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## License
![Badge](https://img.shields.io/badge/license-MIT-blue)
Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing
I would love to expand this project by adding cooler styling and additional features such as being able to post different content types and being able to search users or posts.  A hashtag feature could also be very handy and improve user experience.  Before contributing please read the entire README.md file and contact me via GitHub.  My GitHub info can be found in the final section of the README.md [Questions](#questions).

## Tests
To test this application you can run the server locally or navigate to the [Heroku Deployment](https://jcmvctechblog.herokuapp.com/)  and test the functionality of the app.  You can even check the raw json data by entering the endpoints: "/api/users", "/api/posts", and "/api/comments" in your browser.  You will then be able to cross-reference the raw data with the data presented on the blog pages.  

To adjust the login session time limit as instructed in the [Usage](#usage) section go to the server.js file that is in the root directory.  Go the section where the session variable is defined "const sess = {...}" and in the sess object you will find a "cookie" object property.  Within that cookie object is an "expires" property.  The expires property take an integer argument calculated in milliseconds.  For use on the deployed app I have the expires property set to 2 hours, but you can set it to even lower to test the auto-logout feature.

## Questions
For questions or concerns regarding this project or future collaborations please contact the author via GitHub at:
https://github.com/nystephens
