import {createAction,createReducer} from '@reduxjs/toolkit';
export const set_projects = createAction('set_projects');
const state = [];
export default createReducer(state,{
    [set_projects.type]: (state,data) => {
        state = data.payload;
        return state;
    }
});