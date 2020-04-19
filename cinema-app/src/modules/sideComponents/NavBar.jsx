import React from 'react';
import Logo from '../../assets/images/logo.PNG';


const NavBar = ({handleForm,handleContent}) => 
{

  const showAuth = () => 
  {
    console.log('navbar action')
    handleForm(true);
  }

  const switchContent = (e) => 
  {
    handleContent(e.target.id);
  }

    return(
<div className="header">
        <img
          src={Logo}
          alt="logo"
          width="150px"
          height="150px"
          className="logo"
        />
        <a href="/" className="cat" id={0} onClick={switchContent}>
                Movies
        </a>
        
        <div className="cat" id={1} onClick={switchContent}>
          TV Shows
        </div>

        <div className="cat">
          Celebrities
        </div>
        <div id="cat-auth" onClick={showAuth}>
          Login / Register
        </div>
      </div> 
    );
}

export default NavBar;