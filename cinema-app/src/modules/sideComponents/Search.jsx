import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/SearchOutlined';






const Search = props => {

  const[searchWord,setSearchWord] = useState('');

  const updateWord = event => 
  {
    setSearchWord(event.target.value)
    console.log(searchWord)
  }
  return (
    <div className="search">
      <input type="text" placeholder="Search..." className="search-txt" onChange={updateWord} />
      <div className="search-image-div">
        <SearchIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default Search;
