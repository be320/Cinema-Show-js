import React, { useState, useEffect } from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Search from "../sideComponents/Search";
import Card from "../sideComponents/Card";
import "../style.css";
const axios = require("axios");

const Board = props => {
  const [form, setForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState("");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [content, setContent] = useState(0); //0 for movies and 1 for series



  useEffect(() => {

    content ? getSeries() : getMovies();
    
  },[page,content]);

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

  const handleContent = value => {
    setContent(value)
  }

  const handlePage = e => {
    console.log(e.target.className)
    setPage(e.target.className);
  };

  const DrawForm = () => {
    if (form === true) {
      return <Form handleForm={handleForm} />;
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="container">
      <NavBar handleForm={handleForm} handleContent={handleContent} />
      <div className="body">
        <div className="body-overlay"></div>
        <DrawForm />

        <Search />

        <div className="board">
          {content? series.map(s => (
            <Card data={s} content={content} />
          )) : movies.map(m => (
            <Card data={m} content={content} />
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

export default Board;
