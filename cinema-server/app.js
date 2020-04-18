const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const Routes = require('./routes/show')
const UserRoutes = require('./routes/user')
const sequelize = require('./util/database')
const Movie = require('./models/movie');
const TV = require('./models/tv');
const Review = require('./models/review');
const User = require('./models/user');
const UserLikeMovie = require('./models/userLikeMovie');
const UserLikeTV = require('./models/userLikeTV');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

app.use(UserRoutes);
app.use(Routes);


Review.belongsTo(Movie,{constraints:true, onDelete: 'CASCADE'});
Review.belongsTo(TV,{constraints:true, onDelete: 'CASCADE'});
Review.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});
User.belongsToMany(Movie,{through: UserLikeMovie});
Movie.belongsToMany(User,{through: UserLikeMovie});
User.belongsToMany(TV,{through: UserLikeTV});
TV.belongsToMany(User,{through: UserLikeTV});


sequelize.sync({force:true}).then(result => {
  console.log(result);
  app.listen(8080);
}).catch(err => {
  console.log(err)
});

//const server = http.createServer(app);

