const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const Routes = require('./routes/show')
const UserRoutes = require('./routes/user')
const sequelize = require('./util/database')


const Actor = require('./models/actor');
const Movie = require('./models/movie');
const TV = require('./models/tv');
const MovieReview = require('./models/movieReview');
const TVReview = require('./models/tvReview');
const User = require('./models/user');
const Genre = require('./models/genre');

const ActorInMovie = require('./models/actorInMovie');
const ActorInTV = require('./models/actorInTV');
const UserLikeMovie = require('./models/userLikeMovie');
const UserLikeGenre = require('./models/userLikeGenre');
const UserLikeActor = require('./models/userLikeActor');
const UserLikeTV = require('./models/userLikeTV');
const GenreOfMovie = require('./models/genreOfMovie');
const GenreOfTV = require('./models/genreOfTV');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

app.use(UserRoutes);
app.use(Routes);


// 1 to many realtions

MovieReview.belongsTo(Movie,{constraints:true, onDelete: 'CASCADE'});
TVReview.belongsTo(TV,{constraints:true, onDelete: 'CASCADE'});
MovieReview.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});
TVReview.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});


// many to many relations

User.belongsToMany(Movie,{through: UserLikeMovie});
Movie.belongsToMany(User,{through: UserLikeMovie});

User.belongsToMany(TV,{through: UserLikeTV});
TV.belongsToMany(User,{through: UserLikeTV});

User.belongsToMany(Genre,{through: UserLikeGenre});
Genre.belongsToMany(User,{through: UserLikeGenre});

User.belongsToMany(Actor,{through: UserLikeActor});
Actor.belongsToMany(User,{through: UserLikeActor});

Genre.belongsToMany(Movie,{through: GenreOfMovie});
Movie.belongsToMany(Genre,{through: GenreOfMovie});

Genre.belongsToMany(TV,{through: GenreOfTV});
TV.belongsToMany(Genre,{through: GenreOfTV});

Actor.belongsToMany(Movie,{through: ActorInMovie});
Movie.belongsToMany(Actor,{through: ActorInMovie});

Actor.belongsToMany(TV,{through: ActorInTV});
TV.belongsToMany(Actor,{through: ActorInTV});


//{force:true} if you want to update db structure
sequelize.sync().then(result => {
  console.log(result);
  app.listen(8080);
}).catch(err => {
  console.log(err)
});

//const server = http.createServer(app);

