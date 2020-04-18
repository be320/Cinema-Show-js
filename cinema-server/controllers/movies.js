const Movie = require('../models/movie')
const axios = require('axios');
const apiKey = require('../GLOBAL/api-key');

exports.addMovie = (req,res,next) => 
{
    const id = req.body.id;
    axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+apiKey+'&language=en-US').then(response =>{
       const movie = response.data;
       const name = movie['original_title'];
       const poster = movie['poster_path'];
       const rating = movie['vote_average'];
       const year = movie['release_date'].split('-')[0];
       const trailer = '';
       const overview = '';
       const cast = [];
       const genre = [];
                res.status(201).json({ // success on create
                message: 'Movie added Successfully',
                movie:{name: name,
                      poster:poster,
                    rating:rating,
                     year:year  }
            });
      }).catch(function(error)
      {
        console.log(error);
      });
    // Movie.create({
    //     id: id,
    //     name: 
    //     }).then(result=>{
    //         res.status(201).json({ // success on create
    //             message: 'User added Successfully',
    //             user:{user: req.body}
    //         });
    //     }).catch(err => console.log(err))   

}