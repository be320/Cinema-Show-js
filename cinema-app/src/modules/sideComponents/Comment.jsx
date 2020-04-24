import React from 'react';
import Star from "../sideComponents/Star";

const Comment = ({data}) => {

    console.log(data.user)

    return(
        <div className="review-card">
        <div className="reviewer-name">
          <p>{data.user.name}</p>
        </div>
        <div className="stars">
        {[...Array(10)].map((n, i) => (
            <Star
              key={i}
              selected={i < data.rating}
              onClick={() => {}}
            />
          ))}
        </div>
        <div className="rating-body">
          <p>
            {data.body}
          </p>
        </div>
        <div className="date">
          <p>{data.date}</p>
        </div>
      </div>
    );
}

export default Comment;