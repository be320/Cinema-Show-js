import React,{useState, useEffect} from "react";
import NavBar from "../sideComponents/NavBar";
import Form from "../sideComponents/Form";
import Search from "../sideComponents/Search";
import Card from "../sideComponents/Card";
import Pagination from "../sideComponents/Pagination";
import "../style.css";

const Board = props => {

  const [form,setForm] = useState(false);



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


  return (
        <div className="container">
          <NavBar handleForm={handleForm} />
          <div className="body">
            <div className="body-overlay"></div>
            <DrawForm />

            <Search />

            <div className="board">
              {/* $movie->init(); */}

              <Card />
            </div>
            <Pagination />
          </div>
        </div>
  );
};

export default Board;
