import React from 'react';
import Poster from '../../assets/images/you.jpg';

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
          <h6>Movie Name</h6>
        </div>
        <div className="rating">
          <i
            className="fa fa-star"
            style={{color:'orange',fontSize: '25px',marginRight: '10px'}}
          ></i>
          <p className="rating-value">
            <span className="bold-rating">Movie Rating</span>/10
          </p>
        </div>
      </a>
    );
}

export default Card;