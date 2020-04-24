import React from 'react';
import Plus from "../sideComponents/Plus";
import { connect } from 'react-redux';

const ReviewButton = (props) => {

    const addReview = () => {
        if(props.token === ''){
           // props.handleForm(true);
            props.handleReview(true)
        }
        else{
            props.handleReview(true)
        }
    }


    return(
        <div id="review-button" onClick={addReview}>
            <Plus />
            <p>Review </p>
          </div>
    );
}

const mapStateToProps = state => ({
    token: state.tokenReducer.token,
    user: state.userReducer.user
  })
  
  
  export default connect(
      mapStateToProps
  )(ReviewButton);