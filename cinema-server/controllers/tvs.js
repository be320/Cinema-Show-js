const TV = require("../models/tv");
const Axios = require("axios");
const apiKey = require("../GLOBAL/api-key");

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

      res.status(201).json({
        // success on create
        message: "Series added Successfully",
        series: {
          name: name,
          poster: poster,
          rating: rating,
          year: year,
          overview: overview,
          genres: genres,
          cast: cast,
          trailer: trailer
        }
      });
    })
  );

  // Movie.create({
  //     id: id,
  //     name:
  //     }).then(result=>{
  //         res.status(201).json({ // success on create
  //             message: 'User added Successfully',
  //             user:{user: req.body}
  //         });
  //     }).catch(err => console.log(err))
};
