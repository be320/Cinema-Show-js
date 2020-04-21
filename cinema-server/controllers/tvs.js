const TV = require("../models/tv");
const Actor = require('../models/actor');
const Genre = require('../models/genre');
const Axios = require("axios");
const apiKey = require("../GLOBAL/api-key");
const GenreOfTV = require('../models/genreOfTV');
const ActorInTV = require('../models/actorInTV');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.searchTVs = (req,res,next) => {
  let page = req.params.page;
  let query = req.params.query;


  TV.findAndCountAll({offset:page*18,limit:18,
    where: {
      name:  {
        [Op.like]: '%'+query+'%'
      }
  }}).then(function(series) {

   let arr = [];
   for(let i=0;i<Math.ceil(series.count/18);i++)
   {
    arr[i] = i;
   }

  res.status(200).json({
    // success on fetching
    series:series.rows,
    count:series.count,
    dummy:arr
  });
     
});

}


exports.getTVs = (req,res,next) => {

  let page = req.params.page;


  TV.findAndCountAll({offset:page*18,limit:18}).then(function(series) {

   let arr = [];
   for(let i=0;i<Math.ceil(series.count/18);i++)
   {
    arr[i] = i;
   }

  res.status(200).json({
    // success on fetching
    series:series.rows,
    count:series.count,
    dummy:arr
  });
     
});
}

exports.getTV = (req,res,next) => {
      let id = req.params.id;

      TV.findByPk(id,{ include: [Actor,Genre] }).then(function(serie) {
        res.status(200).json({
          // success on fetching
          serie:serie
        });  
    });
}







exports.addTV = (req, res, next) => {
  const id = req.body.id;
  let series = {};
  let cast = {};
  let trailer = {};

  Axios.all([
    Axios.get(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=" +
        apiKey +
        "&language=en-US"
    ),
    Axios.get(
      "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=" + apiKey
    ),
    Axios.get(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "/videos?api_key=" +
        apiKey +
        "&language=en-US"
    )
  ]).then(
    Axios.spread((seriesData, castData, trailerData) => {
      series = seriesData.data;
      cast = castData.data.cast.slice(0,10);
      trailer = trailerData.data.results[0].key;
      const name = series["original_name"];
      const poster = series["poster_path"];
      const rating = series["vote_average"];
      const year = series["first_air_date"].split("-")[0];
      const overview = series["overview"];
      const genres = series["genres"];

      TV.create({
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
            message: "Series added Successfully",
            series: { name: name}
          });
        }).catch(err => console.log(err))


        genres.map((g)=>{

          const genreId = g['id'];
          const genreName = g['name'];
  
          Genre.create({
            id: genreId,
            name:genreName
          
            }).then(result=>{
              res.status(201).json({
                // success on create
                message: "Genre added Successfully",
                genre: { name: genreName}
              });
            }).catch(err => console.log(err))
  
  
            GenreOfTV.create({
              genreId: genreId,
              tvId: id
              }).then(result=>{
                res.status(201).json({
                  // success on create
                  message: "Genre added To The Series",
                  genre: { name: genreName},
                  series: { name: name}
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
  
            ActorInTV.create({
              rolename:actorRole,
              actorId: actorId,
              tvId: id
              }).then(result=>{
                res.status(201).json({
                  // success on create
                  message: "Actor added to Cast",
                  series: { name: name},
                  actor: {name: actorName, 
                          rolename: actorRole }
                });
              }).catch(err => console.log(err))
  
        });


    })
  );


};
