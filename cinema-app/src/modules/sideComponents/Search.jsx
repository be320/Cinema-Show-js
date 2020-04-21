import React from "react";
import SearchIcon from '@material-ui/icons/SearchOutlined';


const Search = ({handleQuery, handleSearch}) => {


  const updateQuery = event => 
  {
   handleQuery(event.target.value)
   if(event.target.value ==="")
      handleSearch(false);
   else{
     handleSearch(true)
   }   
  }

  const search = () => {
    // handleSearch(true)
  }

  return (
    <div className="search">
      <input type="text" placeholder="Search..." id="search-txt" onChange={updateQuery} />
      {/* <div className="search-image-div" onClick={search}>
        <SearchIcon style={{ color: "white" }} />
      </div> */}
    </div>
  );
};

export default Search;
