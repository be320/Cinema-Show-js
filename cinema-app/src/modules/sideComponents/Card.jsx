import React from 'react';
import Poster from '../../assets/images/you.jpg';
import Star from '../sideComponents/Star'

const Card = props => 
{
    return(
        <a  className="movie" href="/movie"> 
        <div className="poster">
          <img
            src= {Poster}
            width="170px"
            height="260px"
            className="poster-img"
            alt = "movie"
          />
          <div className="overlay"></div>
        </div>
        <div className="title">
          <h6>You</h6>
        </div>
        <div className="rating">
          <Star style={{color:'orange',fontSize: '30px',marginRight: '5px',marginTop:'0px'}} />
          <p className="rating-value">
            <span className="bold-rating">7.4</span>/10
          </p>
        </div>
      </a>
    );
}

export default Card;