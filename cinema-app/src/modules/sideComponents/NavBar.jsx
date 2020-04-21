import React from 'react';
import Logo from '../../assets/images/logo.PNG';
import { connect } from 'react-redux';
import { showMovies,showSeries } from '../../redux';



const NavBar = (props) => 
{
  console.log(props)

  const showAuth = () => 
  {
    console.log('navbar action')
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

        <div className="cat">
          Celebrities
        </div>
        <div id="cat-auth" onClick={showAuth}>
          Login / Register
        </div>
      </div> 
    );
}

const mapStateToProps = state => ({
  content: state.contentReducer.content,
})

const mapDispatchToProps = {
    showMovies,
    showSeries
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar);