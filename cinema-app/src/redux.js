import {combineReducers, createStore} from 'redux';


//types.js
const SHOW_MOVIES = 'SHOW_MOVIES';
const SHOW_SERIES = 'SHOW_SERIES';

//actions.js


export const showMovies = () => (
    {
        type: SHOW_MOVIES
    }
)

export const showSeries = () => (
    {
        type: SHOW_SERIES
    }
)


//reducers.js

const contentInitialState = {
    content: 0
}

export const contentReducer = (state = contentInitialState,action) => {

    switch(action.type)
    {
        case SHOW_MOVIES:
            return {
                ...state,
                content: 0
            }
        case SHOW_SERIES:
                return {
                    ...state,
                    content: 1
                }   
        default:
            return state;    
    }
}

export const reducers = combineReducers({
    contentReducer,
});

//store.js

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
  };
  
  export const store = configureStore();