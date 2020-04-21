import React ,{useState} from 'react'
import LoveIcon from '@material-ui/icons/Favorite';

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
        setStyle({
            ...style,color:'#d52121'
        })
        const check = pressed;
        setPressed(!check);
    }

return(
    <div onMouseEnter={shineMe} onMouseLeave={dullMe} onClick={loveMe} >
    <LoveIcon id="heart" style={style}  />   
    </div>
)
}

export default Favorite;