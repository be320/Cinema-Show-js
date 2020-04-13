import React from 'react';
import Logo from '../../assets/images/logo.PNG';


const NavBar = ({handleForm}) => 
{

  const showAuth = () => 
  {
    console.log('navbar action')
    handleForm(true);
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
        <a href="/" className="cat">
                Movies
        </a>
        
        <div className="cat">
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