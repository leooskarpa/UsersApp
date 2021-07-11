import { createStore, combineReducers } from 'redux';


// Actions
///////////////////////////

export const removeUser = (user) => {
    return {
        type: 'removeUser',
        payload: user
    }
}

export const loadUsers = (users) => {
    return {
        type: 'loadUsers',
        payload: users
    }
}


// Reducer
//////////////////////////

export const reducer = (state = [], action) => {
    switch (action.type) {
        case 'removeUser':
            return state.filter(user => user._id !== action.payload._id)
        case 'loadUsers':
            return action.payload
        default:
            return state
    }
}


// Store
//////////////////////////

export const store = createStore(combineReducers({ users: reducer }));
