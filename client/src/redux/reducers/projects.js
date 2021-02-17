import {createAction,createReducer} from '@reduxjs/toolkit';
export const set_projects = createAction('set_projects');
export const add_project = createAction('add-project');
const state = [];
export default createReducer(state,{
    [set_projects.type]: (state,data) => {
        state = data.payload;
        return state;
    },
    [add_project.type]: (state,data) => {
        state.push(data.payload);
        return state;
    }
});