import React from 'react';
import Logo from '../../assets/images/logo.PNG';
import { connect } from 'react-redux';
import { showMovies,showSeries,deleteToken, deleteUser } from '../../redux';



const NavBar = (props) => 
{

  const showAuth = () => 
  {
    props.handleForm(true);
  }

  const movieClick = () => {
    console.log(props.mainProps.history.location.pathname);
    props.showMovies();
    props.handleSearch(false);
    if(props.mainProps.history.location.pathname === "/")
    document.getElementById("search-txt").value = "";
    props.mainProps.history.push('/');
  
  }

  const seriesClick = () => {
    props.showSeries();
    props.handleSearch(false);
    if(props.mainProps.history.location.pathname === "/")
    document.getElementById("search-txt").value = "";
    props.mainProps.history.push('/');
  }

  const logout = () => {
    props.deleteToken();
    props.deleteUser();
  }

  const RenderAuth = () => {
    if(props.token === ''){
      return(
        <div id="cat-auth" onClick={showAuth}>
        Login / Register
      </div>
      );
    }
    else{
      return(
        <div className="header">
        <div className="user-welcome">
          Welcome , {props.user.name}
        </div>
      <div id="cat-auth" onClick={logout}>
        Logout
      </div>
      </div>
        );
    }
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
        <div className="cat" onClick={movieClick}>
                Movies
        </div>
        
        <div className="cat" onClick={seriesClick}>
          TV Shows
        </div>
        <RenderAuth />
      </div> 
    );
}

const mapStateToProps = state => ({
  content: state.contentReducer.content,
  token: state.tokenReducer.token,
  user: state.userReducer.user
})

const mapDispatchToProps = {
    showMovies,
    showSeries,
    deleteToken,
    deleteUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar);