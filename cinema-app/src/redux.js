import {combineReducers, createStore} from 'redux';


//types.js
const SHOW_MOVIES = 'SHOW_MOVIES';
const SHOW_SERIES = 'SHOW_SERIES';

const ADD_TOKEN = 'ADD_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

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


export const addToken = (token) => (
    {
        type: ADD_TOKEN,
        token
    }
)
export const deleteToken = () => (
    {
        type: DELETE_TOKEN
    }
)

export const addUser = (user) => (
    {
        type: ADD_USER,
        user
    }
)
export const deleteUser = () => (
    {
        type: DELETE_USER
    }
)


//reducers.js

const contentInitialState = {
    content: 0
}

const tokenInitialState = {
    token: ''
}

const userInitialState = {
    user: ''
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


export const tokenReducer = (state = tokenInitialState,action) => {

    switch(action.type)
    {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case DELETE_TOKEN:
                return {
                    ...state,
                    token: ''
                }   
        default:
            return state;    
    }
}


export const userReducer = (state = userInitialState,action) => {

    switch(action.type)
    {
        case ADD_USER:
            return {
                ...state,
                user: action.user
            }
        case DELETE_USER:
                return {
                    ...state,
                    user: ''
                }   
        default:
            return state;    
    }
}

export const reducers = combineReducers({
    contentReducer, tokenReducer, userReducer
});

//store.js

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
  };
  
  export const store = configureStore();