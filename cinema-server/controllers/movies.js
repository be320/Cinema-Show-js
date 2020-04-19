const Movie = require("../models/movie");
const Actor = require('../models/actor');
const Genre = require('../models/genre');
const GenreOfMovie = require('../models/genreOfMovie');
const ActorInMovie = require('../models/actorInMovie');

const Axios = require("axios");
const apiKey = require("../GLOBAL/api-key");



exports.getMovies = (req,res,next) => {

  let page = req.params.page;


  Movie.findAndCountAll({offset:page*18,limit:18}).then(function(movies) {

   let arr = [];
   for(let i=0;i<Math.ceil(movies.count/18);i++)
   {
    arr[i] = i;
   }

  res.status(200).json({
    // success on fetching
    movies:movies.rows,
    count:movies.count,
    dummy:arr
  });
     
});
}

exports.getMovie = (req,res,next) => {
      let id = req.params.id;

      Movie.findByPk(id,{ include: [Actor,Genre] }).then(function(movie) {
        res.status(200).json({
          // success on fetching
          movie:movie
        });  
    });


 
}



exports.addMovie = (req, res, next) => {
  const id = req.body.id;
  let movie = {};
  let cast = [];
  let trailer = {};

  Axios.all([
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        apiKey +
        "&language=en-US"
    ),
    Axios.get(
      "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + apiKey
    ),
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        apiKey +
        "&language=en-US"
    )
  ]).then(
    Axios.spread((movieData, castData, trailerData) => {
      movie = movieData.data;
      cast = castData.data.cast.slice(0,10);
      trailer = trailerData.data.results[0].key;
      const name = movie["original_title"];
      const poster = movie["poster_path"];
      const rating = movie["vote_average"];
      const year = movie["release_date"].split("-")[0];
      const overview = movie["overview"];
      const genres = movie["genres"];

      console.log(movie);

     Movie.create({
      id: id,
      name:name,
      poster:poster,
      rating:rating,
      year:year,
      overview:overview,
      trailer:trailer
      }).then(result=>{
        res.status(201).json({
          // success on create
          message: "Movie added Successfully",
          movie: { name: name}
        });
      }).catch(err => console.log(err))


      genres.map((g)=>{

        const genreId = g['id'];
        const genreName = g['name'];

        Genre.create({
          id: genreId,
          name:genreName,
        
          }).then(result=>{
            res.status(201).json({
              // success on create
              message: "Genre added Successfully",
              genre: { name: genreName}
            });
          }).catch(err => console.log(err))


          GenreOfMovie.create({
            genreId: genreId,
            movieId: id
          
            }).then(result=>{
              res.status(201).json({
                // success on create
                message: "Genre added To The Movie",
                genre: { name: genreName},
                movie: { name: name}
              });
            }).catch(err => console.log(err))


      });


      cast.map((c)=>{

        const actorId = c['id'];
        const actorName = c['name'];
        const actorImage = c['profile_path'];
        const actorRole = c['character'];

        Actor.create({
          id: actorId,
          name:actorName,
          image:actorImage
          }).then(result=>{
            res.status(201).json({
              // success on create
              message: "Actor added Successfully",
              actor: { name: actorName}
            });
          }).catch(err => console.log(err))

          ActorInMovie.create({
            rolename:actorRole,
            actorId: actorId,
            movieId: id
            }).then(result=>{
              res.status(201).json({
                // success on create
                message: "Actor added to Cast",
                movie: { name: name},
                actor: {name: actorName, 
                        rolename: actorRole }
              });
            }).catch(err => console.log(err))

      });


     
    })
  );


};
