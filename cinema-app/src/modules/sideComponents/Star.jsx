import React from 'react'
import StarIcon from '@material-ui/icons/StarRate';

const Star = ({selected = false, onClick = f => f, color="gray"}) => 
{



return(
    <div>
    <StarIcon style={{fontSize: '30px',
    cursor: 'pointer',color: selected ? "orange" : color}} onClick={onClick} />   
    </div>
)
}

export default Star;