import {
     CURRENT_USER
 } from '../actions/types';

const INIT_STATE = { 
    loading: false,
    user: null
}
 
export default (state = INIT_STATE, action) => {
     // Goes through all action types
    switch (action.type){
        case CURRENT_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}