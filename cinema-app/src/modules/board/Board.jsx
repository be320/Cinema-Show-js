import React, { useState, useEffect } from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Search from "../sideComponents/Search";
import Card from "../sideComponents/Card";
import "../style.css";
import { connect } from 'react-redux';
import { showMovies,showSeries } from '../../redux';
import Error from "../sideComponents/Error";
import NotFound from "../../assets/images/not found.jpg"
const axios = require("axios");

const Board = props => {
  const [form, setForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState("");
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState([]);
  const [error,setError] = useState(false);
  const [search,setSearch] = useState(false);
  const [errorMessages,setErrorMessages] = useState([]);
  



  useEffect(() => {


    if(search === false){
      props.content ? getSeries() : getMovies();
    }
    else{
      props.content ? searchSeries() : searchMovies();
    }

    
  },[page,props,query,search]);

  const getMovies = () => {
 
    axios.get("http://localhost:8080/movies/" + page).then(res=>{
      setMovies(res.data.movies);
      setCount(res.data.count);
      setPages(res.data.dummy);
     
    })
  };



  const getSeries = () => {
 
    axios.get("http://localhost:8080/tvs/" + page).then(res=>{
      setSeries(res.data.series);
      setCount(res.data.count);
      setPages(res.data.dummy);
     
    })
  };

  const searchMovies = () => {

    axios.get("http://localhost:8080/movies/"+query+"/" + page).then(res=>{
      setMovies(res.data.movies);
      setCount(res.data.count);
      setPages(res.data.dummy);
     
    })
  }

  const searchSeries = () => {

    console.log('wow series')

    axios.get("http://localhost:8080/tvs/"+query+"/" + page).then(res=>{
      setSeries(res.data.series);
      setCount(res.data.count);
      setPages(res.data.dummy);
     
    })
  }

  const handleForm = value => {
    setForm(value);
  };

  const handleQuery = value =>{
    console.log(value);
    setQuery(value)
  }

  const handleSearch = value => {
    setSearch(value);
  }

  const handleError = (value,errors) => {
    errors = errors || []; 
    
    setError(value);
    setErrorMessages(errors);
  };

  const handlePage = e => {
    console.log(e.target.className)
    setPage(e.target.className);
  };

  const DrawForm = () => {
    if (form === true) {
      return <Form handleForm={handleForm} handleError = {handleError} />;
    } else {
      return <div></div>;
    }
  };

  const DrawError = () => {
    if (error === true) {
      return <Error handleError={handleError} errorMessages = {errorMessages} />;
    } else {
      return <div></div>;
    }
  };

  const RenderBoard = () => {
    console.log(series);
    console.log(movies);
    if(props.content)
    {
      if(series.length>0){
        return(
          series.map(s => (
            <Card data={s} content={props.content} />
          )) 
        )
      }
      else{
        return(
          <img
          src={NotFound}
          alt="notFound"
          width="565px"
          height="300px"
          className="notFound"
        />
        )
      }
    }
    else{

      if(movies.length>0){
        return(
          movies.map(m => (
            <Card data={m} content={props.content} />
          )) 
        )
      }
      else{
        return(
        //   <img
        //   src={NotFound}
        //   alt="notFound"
        //   width="565px"
        //   height="300px"
        //   className="notFound"
        // />
        <div>Not Found</div>
        )
      }

    }
    
  }

  return (
    <div className="container">
      <NavBar handleForm={handleForm} mainProps={props} handleSearch = {handleSearch} />
      <div className="body">
        <div className="body-overlay"></div>
        <DrawForm />
        <DrawError />

        <Search handleQuery={handleQuery} handleSearch = {handleSearch} />

        <div className="board">
          <RenderBoard />
        </div>
        <ul className="pagination">
          { Object.keys(pages).length?  pages.map(page => {
            return (
              <li id="page" onClick={handlePage} className={page} >
                {page + 1}
              </li>
            );
          }) : <div></div>}
        </ul>
      </div>
    </div>
  );
};

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
)(Board);


