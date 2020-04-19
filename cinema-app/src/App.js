import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Board from './modules/board/Board';
import Movie from './modules/movie/Movie';
import TV from './modules/TV/TV';
import { Provider } from 'react-redux';
import { store } from './redux';

const App = props => 
{
  return(
    <Provider store={store}>
    <Router>
        <Route exact path='/' component={Board} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/tv/:id' component={TV} />
    </Router>
    </Provider>
  );
}

export default App;
