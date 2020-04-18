import React ,{useRef,useEffect} from 'react';
import Star from "../sideComponents/Star";

const Review = ({handleReview}) => 
{
    const node = useRef();

    const starsArr = [1,2,3,4,5,6,7,8,9,10];

    const stars = starsArr.map((star)=>{
        return(<Star style={{color:'yellow'}} />);
    })



    const closeAction = e => {
        if (!node.current.contains(e.target)) {
          handleReview(false);
        }
      };

      const cancel = () => {
        handleReview(false);
      }

      useEffect(() => {

        document.addEventListener("mousedown", closeAction);
    
        return () => {
          document.removeEventListener("mousedown", closeAction);
        };
      }, []);

    return(
        <div id="my-review-div" >
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
            <div id="stars">
           {stars}
            </div>
            <div className="review-options">
              <div id="submit-review">
                <p>Share</p>
              </div>
              <div id="cancel-review" onClick={cancel}>
                <p>Cancel </p>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Review;