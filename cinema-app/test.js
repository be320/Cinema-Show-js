const stars = [];
let rated = false;
let result = 0;

const mouseEnter = (index) => {
    for(let i=0; i < 10; i++){
        if(i<=index){
            stars[i] = 'orange';
        }
        else{
            stars[i] = 'gray';
        }
    }
}

const mouseLeave = () => {  // for stars container
    if(rated===false){
        for(let i=0; i < 10; i++){
            stars[i] = 'gray';
        }
    }
    else{
        for(let i=0; i < 10; i++){
            if(i<=result){
                stars[i] = 'orange';
            }
            else{
                stars[i] = 'gray';
            }
        }
    }
}

const mouseClick = (index) => {
        result = index;
        rated = true;
}