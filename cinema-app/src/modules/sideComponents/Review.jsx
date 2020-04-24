/* eslint-disable no-loop-func */
import React, { useRef, useEffect,useState } from "react";
import Star from '../sideComponents/Star';

const Review = ({ handleReview }) => {
  const node = useRef();

  const [starsSelected, selectStar] = useState(0);

 

  const closeAction = e => {
    if (!node.current.contains(e.target)) {
      handleReview(false);
    }
  };

  const cancel = () => {
    handleReview(false);
  };

  const share = () => {
    // console.log(rate);
  }



  useEffect(() => {
    

    document.addEventListener("mousedown", closeAction);

    return () => {
      document.removeEventListener("mousedown", closeAction);
    };
  },[]);

  

 











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
        ></textarea>
        <div className="your-review-title">
          <h2>Share Your Rating:</h2>
        </div>
        <div id="stars" > {[...Array(10)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}</div>
      <p className="result">{starsSelected + " of  10 "}</p>
        <div className="review-options">
          <div id="submit-review" onClick={share} >
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

export default Review;
