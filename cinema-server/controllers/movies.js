const Movie = require("../models/movie");
const Axios = require("axios");
const apiKey = require("../GLOBAL/api-key");

exports.addMovie = (req, res, next) => {
  const id = req.body.id;
  let movie = {};
  let cast = {};
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

      res.status(201).json({
        // success on create
        message: "Movie added Successfully",
        movie: {
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
