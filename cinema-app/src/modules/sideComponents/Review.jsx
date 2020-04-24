/* eslint-disable no-loop-func */
import React, { useRef, useEffect, useState } from "react";
import Star from "../sideComponents/Star";
import { connect } from "react-redux";
const axios = require("axios");

const Review = props => {
  const node = useRef();

  const [starsSelected, selectStar] = useState(0);
  const [body, setBody] = useState("");

  const closeAction = e => {
    if (!node.current.contains(e.target)) {
      props.handleReview(false);
    }
  };

  const cancel = () => {
    props.handleReview(false);
  };

  const handleBody = e => {
    setBody(e.target.value);
  };

  const addComment = () => {
    
  }

  const share = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date;

    let review = {
      body: body,
      rating: starsSelected,
      date: dateTime
    }

    axios
      .post(
        "http://localhost:8080/user/" +
          props.user.id +
          "/rateMovie/" +
          props.movieId, review
      )
      .then(response => {
        const userObj = { user: props.user }
        const updatedData = {...response.data.review, ...userObj }
        console.log(updatedData);
       props.handleComments([...props.comments,updatedData]);

        props.handleReview(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAction);

    return () => {
      document.removeEventListener("mousedown", closeAction);
    };
  }, []);

  return (
    <div id="my-review-div">
      <div className="my-review-content" ref={node}>
        <div className="your-review-title">
          <h2>Share Your Review:</h2>
        </div>
        <textarea
          name="message"
          rows="5"
          cols="100"
          id="review-textarea"
          placeholder="Your Review ..."
          onChange={handleBody}
        ></textarea>
        <div className="your-review-title">
          <h2>Share Your Rating:</h2>
        </div>
        <div id="stars">
          {" "}
          {[...Array(10)].map((n, i) => (
            <Star
              key={i}
              selected={i < starsSelected}
              onClick={() => selectStar(i + 1)}
            />
          ))}
           <p className="result">{starsSelected + " of  10 "}</p>
        </div>
        <div className="review-options">
       <div id="submit-review" onClick={share}>
            <p>Share</p>
          </div>
          <div id="cancel-review" onClick={cancel}>
            <p>Cancel </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.tokenReducer.token,
  user: state.userReducer.user
});

export default connect(mapStateToProps)(Review);
