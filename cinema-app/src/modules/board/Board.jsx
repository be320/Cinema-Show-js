import React, { useState, useEffect } from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Search from "../sideComponents/Search";
import Card from "../sideComponents/Card";
import "../style.css";
import { connect } from 'react-redux';
import { showMovies,showSeries } from '../../redux';
import Error from "../sideComponents/Error";
const axios = require("axios");

const Board = props => {
  const [form, setForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState("");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [error,setError] = useState(false);
  const [errorMessages,setErrorMessages] = useState([]);
  



  useEffect(() => {

    console.log(props)

   props.content ? getSeries() : getMovies();
    
  },[page,props]);

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

  const handleForm = value => {
    setForm(value);
  };

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

  return (
    <div className="container">
      <NavBar handleForm={handleForm} mainProps={props} />
      <div className="body">
        <div className="body-overlay"></div>
        <DrawForm />
        <DrawError />

        <Search />

        <div className="board">
          {props.content? series.map(s => (
            <Card data={s} content={props.content} />
          )) : movies.map(m => (
            <Card data={m} content={props.content} />
          ))} 
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


