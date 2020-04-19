import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Board from './modules/board/Board';
import Movie from './modules/movie/Movie';
import TV from './modules/TV/TV';

const App = props => 
{
  return(
    <Router>
        <Route exact path='/' component={Board} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/tv/:id' component={TV} />
    </Router>
  );
}

export default App;
