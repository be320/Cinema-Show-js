import React ,{useState, useEffect} from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Poster from "../../assets/images/you.jpg";
import Star from "../sideComponents/Star";
import Favorite from "../sideComponents/Favorite";
import Review from "../sideComponents/Review"
import Error from "../sideComponents/Error";
import "../style.css";
import ReviewButton from "../sideComponents/ReviewButton";
import { connect } from 'react-redux';
const axios = require('axios');
const imgKey = require('../../GLOBAL/img-key');
const youtube = require('../../GLOBAL/youtube');



const Movie = (props) => {

  const [form,setForm] = useState(false);
  const [review,setReview] = useState(false);
  const [movie,setMovie] = useState({});
  const [error,setError] = useState(false);
  const [errorMessages,setErrorMessages] = useState([]);

  useEffect(()=>{
    getMovie();
  },[]);

  const getMovie = async () => {
    const data = await axios.get('http://localhost:8080/movie/'+props.match.params.id);
    setMovie(data.data.movie)
    console.log(data.data.movie)
  }

  const handleForm = (value) => 
  {
    setForm(value);
  }

  const handleSearch = () => {

  }

  const handleError = (value,errors) => {
    errors = errors || []; 
    
    setError(value);
    setErrorMessages(errors);
  };

  const handleContent = value => {
    
  }

  const handleReview = (value) => 
  {
    setReview(value);
  }

  const DrawReview = () => 
  {
    if(review === true)
    {
      return(
        <Review handleReview={handleReview} />
      )
    }
    else
    {
      return(
        <div></div>
      )
    }
  }

  const DrawForm = () => 
  {
    if(form === true)
    {
      return(
        <Form handleForm={handleForm} handleError = {handleError} />
      )
    }
    else
    {
      return(
        <div></div>
      )
    }
  }

  const DrawError = () => {
    if (error === true) {
      return <Error handleError={handleError} errorMessages = {errorMessages} />;
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="container">
      <NavBar handleForm={handleForm} mainProps={props} handleSearch={handleSearch} />

      <div className="body">
        <div className="body-overlay"></div>
        <DrawForm />
        <DrawError />
        <DrawReview />
        <div className="movie-structure">
          <div className="portofolio">
            <div className="movie-poster">
              <img
                src={imgKey+movie.poster}
                width="330px"
                height="500px"
                className="poster-img"
                alt="poster"
              />
            </div>
            <div className="rating">
            <Star color="orange" />
              <p className="rating-value">
                <span className="bold-rating">{movie.rating}</span>/10
              </p>
              <div className="love">
              <Favorite handleForm={handleForm} movieId={props.match.params.id}  />
              </div>
            </div>
          </div>
          <div className="details">
            <div className="movie-title">
              <h1 className="title-head">{movie.name}</h1>
              <p className="title-year">{movie.year}</p>
            </div>
            <iframe
              width="700"
              height="345"
              src= {Object.keys(movie).length? `https://www.youtube.com/embed/${movie.trailer}` : ''}
              title="trailer"
              className="trailer"
            ></iframe>
            <div className="overview">
              <h2 className="overview-head">Overview:</h2>
              <h6 className="overview-body">{movie.overview}</h6>
            </div>
            <div className="cast">
              <div className="cast-head">
                <h2>Cast:</h2>
              </div>

              {
               Object.keys(movie).length?  movie.actors.map((actor)=>{
                  return(
                    <div className="actor">
                <div className="actor-img-div">
                  <img
                    src={imgKey+actor.image}
                    width="100px"
                    height="150px"
                    className="actor-img"
                    alt="actor"
                  />
                </div>
                <div className="actor-name">
                  <h6 className="overview-body">{actor.name}</h6>
                </div>
                <div className="actor-role">
                  <p className="title-year">{actor.actorInMovie.rolename}</p>
                </div>
              </div>
                  )
                }) : <div></div>
              }

              
            </div>

            <div className="reviews">
              <div className="review-head">
                <h2>Reviews:</h2>
                <ReviewButton handleReview={handleReview} handleForm={handleForm} />
              </div>

              <div className="reviews-list">
                <div className="review-card">
                  <div className="reviewer-name">
                    <p>Ahmed Bahaa</p>
                  </div>
                  <div className="stars">
                    <Star />
                  </div>
                  <div className="rating-body">
                    <p>
                      It is really a very cool series , I am in deep crush with
                      BECK !!!
                    </p>
                  </div>
                  <div className="date">
                    <p>17 September 2019</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.tokenReducer.token,
  user: state.userReducer.user
})


export default connect(
	mapStateToProps
)(Movie);
