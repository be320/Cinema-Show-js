import React ,{useState, useEffect} from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Poster from "../../assets/images/you.jpg";
import Star from "../sideComponents/Star";
import Plus from "../sideComponents/Plus";
import Review from "../sideComponents/Review"
import "../style.css";
const axios = require('axios');
const imgKey = require('../../GLOBAL/img-key');
const youtube = require('../../GLOBAL/youtube');

const TV = (props) => {

  const [form,setForm] = useState(false);
  const [review,setReview] = useState(false);
  const [series,setSeries] = useState({});

  useEffect(()=>{
    getSeries();
  },[]);

  const getSeries = async () => {
    const data = await axios.get('http://localhost:8080/tv/'+props.match.params.id);
    setSeries(data.data.serie)
    console.log(data.data.serie)
  }

  const handleForm = (value) => 
  {
    setForm(value);
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
        <Form handleForm={handleForm} />
      )
    }
    else
    {
      return(
        <div></div>
      )
    }
  }

  return (
    <div className="container">
      <NavBar  handleForm={handleForm} />

      <div className="body">
        <div className="body-overlay"></div>
        <DrawForm />
        <DrawReview />
        <div className="movie-structure">
          <div className="portofolio">
            <div className="movie-poster">
              <img
                src={imgKey+series.poster}
                width="330px"
                height="500px"
                className="poster-img"
                alt="poster"
              />
            </div>
            <div className="rating">
            <Star style={{color:'orange',fontSize: '35px',marginRight: '5px',marginTop:'0px'}} />
              <p className="rating-value">
                <span className="bold-rating">{series.rating}</span>/10
              </p>
            </div>
          </div>
          <div className="details">
            <div className="movie-title">
              <h1 className="title-head">{series.name}</h1>
              <p className="title-year">{series.year}</p>
            </div>
            <iframe
              width="700"
              height="345"
              src= {Object.keys(series).length? `https://www.youtube.com/embed/${series.trailer}` : ''}
              title="trailer"
              className="trailer"
            ></iframe>
            <div className="overview">
              <h2 className="overview-head">Overview:</h2>
              <h6 className="overview-body">{series.overview}</h6>
            </div>
            <div className="cast">
              <div className="cast-head">
                <h2>Cast:</h2>
              </div>

              {
               Object.keys(series).length?  series.actors.map((actor)=>{
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
                  <p className="title-year">{actor.actorInTV.rolename}</p>
                </div>
              </div>
                  )
                }) : <div></div>
              }

              
            </div>

            <div className="reviews">
              <div className="review-head">
                <h2>Reviews:</h2>
                <div id="review-button" onClick={
                  ()=>handleReview(true)}>
                  <Plus />
                  <p>Review </p>
                </div>
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

export default TV;
