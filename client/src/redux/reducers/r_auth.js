import {createReducer,createAction} from '@reduxjs/toolkit'; 
export const authenticate = createAction('authenticate');
const state = {
    authenticated: false,
    user: null
};

export default createReducer(state,{
    [authenticate.type]: (state,data) => {
        state.authenticated = true;
        state.user = data.payload;
        return state;
    },

});