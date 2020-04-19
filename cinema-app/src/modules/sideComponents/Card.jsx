import React from 'react';
import Star from '../sideComponents/Star'
const imgKey = require('../../GLOBAL/img-key');

const Card = ({data}) => 
{
    return(
        <a  className="movie" href={'/movie/'+data.id}> 
        <div className="poster">
          <img
            src= {imgKey+data.poster}
            width="170px"
            height="260px"
            className="poster-img"
            alt = "movie"
          />
          <div className="overlay"></div>
        </div>
        <div className="title">
          <h6>{data.name}</h6>
        </div>
        <div className="rating">
          <Star style={{color:'orange',fontSize: '30px',marginRight: '5px',marginTop:'0px'}} />
          <p className="rating-value">
            <span className="bold-rating">{data.rating}</span>/10
          </p>
        </div>
      </a>
    );
}

export default Card;