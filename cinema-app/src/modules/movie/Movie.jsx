import React ,{useState} from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Poster from "../../assets/images/you.jpg";
import Star from "../sideComponents/Star";
import Plus from "../sideComponents/Plus";
import Review from "../sideComponents/Review"
import "../style.css";

const Movie = () => {

  const [form,setForm] = useState(false);
  const [review,setReview] = useState(false);

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
                src={Poster}
                width="330px"
                height="500px"
                className="poster-img"
                alt="poster"
              />
            </div>
            <div className="rating">
            <Star style={{color:'orange',fontSize: '35px',marginRight: '5px',marginTop:'0px'}} />
              <p className="rating-value">
                <span className="bold-rating">7.8</span>/10
              </p>
            </div>
          </div>
          <div className="details">
            <div className="movie-title">
              <h1 className="title-head">You</h1>
              <p className="title-year">2018</p>
            </div>
            <iframe
              width="700"
              height="345"
              src="https://www.youtube.com/embed/ga1m0wjzscU"
              title="trailer"
              className="trailer"
            ></iframe>
            <div className="overview">
              <h2 className="overview-head">Overview:</h2>
              <h6 className="overview-body">It is a great Movie</h6>
            </div>
            <div className="cast">
              <div className="cast-head">
                <h2>Cast:</h2>
              </div>

              <div className="actor">
                <div className="actor-img-div">
                  <img
                    src={Poster}
                    width="100px"
                    height="150px"
                    className="actor-img"
                    alt="actor"
                  />
                </div>
                <div className="actor-name">
                  <h6 className="overview-body"> Ahmed</h6>
                </div>
                <div className="actor-role">
                  <p className="title-year">King Lear</p>
                </div>
              </div>
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

export default Movie;
