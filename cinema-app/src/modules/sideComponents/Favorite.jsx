import React ,{useState} from 'react'
import LoveIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
const axios = require('axios')

const Favorite = (props) => 
{
    const [style,setStyle] = useState({color:'gray',fontSize: '25px',marginRight: '0px',marginTop:'0px'});
    const [pressed,setPressed] = useState(false);

    const shineMe = () => {

        setStyle({
            ...style,color:'#d52121'
        })
       
    }

    const dullMe = () => {
        if(pressed===false){
            setStyle({
                ...style,color:'gray'
            })
        }
        
    }

    const loveMe = () => {
        if(props.token === ''){
            props.handleForm(true);
        }
        else{
            setStyle({
                ...style,color:'#d52121'
            })
            const check = pressed;
            if(check === false){ //like movie
                axios.post(
                    'http://localhost:8080/user/'+props.user.id+'/likeMovie/'+props.movieId
                  ).then( response => {
                    console.log(response);
                  }).catch( error => {
                    console.log(error);
                  });
              
            }
            setPressed(!check);
            console.log(props.user);
        }
       
    }

return(
    <div onMouseEnter={shineMe} onMouseLeave={dullMe} onClick={loveMe} >
    <LoveIcon id="heart" style={style}  />   
    </div>
)
}

const mapStateToProps = state => ({
    token: state.tokenReducer.token,
    user: state.userReducer.user
  })
  
  
  export default connect(
      mapStateToProps
  )(Favorite);
  