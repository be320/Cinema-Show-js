import React,{useState, useEffect} from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Search from "../sideComponents/Search";
import Card from "../sideComponents/Card";
import Pagination from "../sideComponents/Pagination";
import "../style.css";
const axios = require('axios');

const Board = props => {

  const [form,setForm] = useState(false);
  const [movies,setMovies] = useState([]);


  useEffect(()=>{
    getMovies();
  },[])

  const getMovies = async () => 
  {
    
    const data = await axios.get('http://localhost:8080/movies');

    setMovies(data.data.movies)

    console.log(data.data.movies)
   
  }

  const handleForm = (value) => 
  {
    setForm(value);
  }

  const DrawForm = () => 
  {
    if(form === true)
    {
      return(
        <Form handleForm={handleForm} />
      )
    }
    else
    {
      return(
        <div></div>
      )
    }
  }

  // const RenderCards = () =>
  // {
  //   if(movies.length>0){

  //     const data = 

  //     return({data})

  //   }
  //   else
  //   return(<div></div>)
  
  // }


  return (
        <div className="container">
          <NavBar  handleForm={handleForm} />
          <div className="body">
            <div className="body-overlay"></div>
            <DrawForm />

            <Search />

            <div className="board">

             {movies.map((m)=>( <Card data={m} />))}
            </div>
            <Pagination />
          </div>
        </div>
  );
};

export default Board;
