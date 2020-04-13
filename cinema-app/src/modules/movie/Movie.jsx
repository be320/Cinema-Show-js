import React from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Poster from "../../assets/images/you.jpg";
import Stars from "../sideComponents/Stars";
import Plus from "../sideComponents/Plus";
import "../style.css";

const Movie = () => {
  return (
    <div class="container">
      <NavBar />

      <div class="body">
        <div class="body-overlay"></div>
        <Form />
        <div id="my-review-div">
          <div class="my-review-content">
            <div class="your-review-title">
              <h2>Share Your Review:</h2>
            </div>
            <textarea
              name="message"
              rows="5"
              cols="100"
              id="review-textarea"
              placeholder="Your Review ..."
            ></textarea>
            <div class="your-review-title">
              <h2>Share Your Rating:</h2>
            </div>
            <div id="stars">
              <Stars />
            </div>
            <div class="review-options">
              <div id="submit-review">
                <p>Share</p>
              </div>
              <div id="cancel-review">
                <p>Cancel </p>
              </div>
            </div>
          </div>
        </div>
        <div class="movie-structure">
          <div class="portofolio">
            <div class="movie-poster">
              <img
                src={Poster}
                width="330px"
                height="500px"
                class="poster-img"
                alt="poster"
              />
            </div>
            <div class="rating">
              <Stars />
              <p class="rating-value">
                <span class="bold-rating">7.8</span>/10
              </p>
            </div>
          </div>
          <div class="details">
            <div class="movie-title">
              <h1 class="title-head">You</h1>
              <p class="title-year">2018</p>
            </div>
            <iframe
              width="700"
              height="345"
              src="https://www.youtube.com/embed/ga1m0wjzscU"
              title="trailer"
              class="trailer"
            ></iframe>
            <div class="overview">
              <h2 class="overview-head">Overview:</h2>
              <h6 class="overview-body">It is a great Movie</h6>
            </div>
            <div class="cast">
              <div class="cast-head">
                <h2>Cast:</h2>
              </div>

              <div class="actor">
                <div class="actor-img-div">
                  <img
                    src={Poster}
                    width="100px"
                    height="150px"
                    class="actor-img"
                    alt="actor"
                  />
                </div>
                <div class="actor-name">
                  <h6 class="overview-body"> Ahmed</h6>
                </div>
                <div class="actor-role">
                  <p class="title-year">King Lear</p>
                </div>
              </div>
            </div>

            <div class="reviews">
              <div class="review-head">
                <h2>Reviews:</h2>
                <div id="review-button">
                  <Plus />
                  <p>Review </p>
                </div>
              </div>

              <div class="reviews-list">
                <div class="review-card">
                  <div class="reviewer-name">
                    <p>Ahmed Bahaa</p>
                  </div>
                  <div class="stars">
                    <Stars />
                  </div>
                  <div class="rating-body">
                    <p>
                      It is really a very cool series , I am in deep crush with
                      BECK !!!
                    </p>
                  </div>
                  <div class="date">
                    <p>17 September 2019</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="../../helperFunctions/actions.js"></script>
      </div>
    </div>
  );
};

export default Movie;
